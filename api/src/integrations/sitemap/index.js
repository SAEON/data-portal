import { performance } from 'perf_hooks'
import getLists from './_lists.js'
import cachedir from './_cachdir.js'
import ensureDirectory from '../../lib/ensure-directory.js'
import getCurrentDirectory from '../../lib/get-current-directory.js'
import createSitemap from './_sitemap.js'
import { query as elasticQuery } from '../../elasticsearch/index.js'
import fetchElasticRecords from '../../elasticsearch/query-builder/records.js'
import { join, normalize } from 'path'
import { copyFile } from 'fs/promises'

const __dirname = getCurrentDirectory(import.meta)
const clientAssetsDirectory = normalize(join(__dirname, '../../clients'))
let lock = false

export default async function () {
  if (lock) {
    throw new Error(
      'This integration is already running. Please wait for it to finish and try again'
    )
  }

  lock = true
  const t0 = performance.now()

  try {
    await ensureDirectory(cachedir)
    await ensureDirectory(clientAssetsDirectory)

    const lists = await getLists()
    console.info('Sitemaps temp cache configured', cachedir)

    // Create the entry sitemap.xml file
    const f1Name = 'sitemap_collections.xml'
    const f1CachePath = normalize(join(cachedir, f1Name))
    const { sitemap: s1, file: f1 } = createSitemap(f1CachePath)
    await new Promise(async res1 => {
      f1.on('finish', async () => {
        await copyFile(f1CachePath, normalize(join(clientAssetsDirectory, f1Name)))
        res1()
      })

      for (const list of lists) {
        const { _id, filter } = list
        const id = _id.toString()

        s1.write({
          url: `/list/records?search=${id}`,
          changefreq: 'monthly',
          priority: 0.75,
        })

        // Create sub-sitemap
        const f2Name = `sitemap_collection_records-${id}.xml`
        const f2CachePath = normalize(join(cachedir, f2Name))
        const { sitemap: s2, file: f2 } = createSitemap(f2CachePath)
        await new Promise(async res2 => {
          f2.on('finish', async () => {
            await copyFile(f2CachePath, normalize(join(clientAssetsDirectory, f2Name)))
            res2()
          })

          // Fetch records for this list
          const { hits: records } = await fetchElasticRecords({
            ctx: { elastic: { query: elasticQuery } },
            args: filter,
          })

          for (const {
            _source: { doi },
          } of records) {
            if (doi) {
              s2.write({
                url: `/list/records/${doi}?search=${id}`,
                changefreq: 'monthly',
                priority: 1,
              })
            }
          }

          // Close the child sitemap
          s2.end()
        })
      }

      // Close the main sitemap
      s1.end()
    })

    // DONE
    const t1 = performance.now()
    const runtime = `${Math.round((t1 - t0) / 1000, 2)} seconds`
    console.info('Sitemap generated successfully', runtime)
  } catch (error) {
    throw new Error(`ERROR generating sitemap.xml: ${error.message}`)
  } finally {
    lock = false
  }
}
