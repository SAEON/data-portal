import { performance } from 'perf_hooks'
import getLists from './_lists.js'
import cachedir from './_cachdir.js'
import ensureDirectory from '../../lib/ensure-directory.js'
import getCurrentDirectory from '../../lib/get-current-directory.js'
import createSitemap from './_sitemap.js'
import { query as elasticQuery } from '../../elasticsearch/index.js'
import fetchElasticRecords from '../../elasticsearch/query-builder/records.js'
import { join, normalize } from 'path'
import { copyFile, readdir, unlink } from 'fs/promises'

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

    /**
     * As sitemaps are created in the cache directory,
     * register them in this array so that they can
     * then be copied to the client public folder
     *
     * [{
     *   from: absotelute path of cache,
     *   to: absolutep path of client public folder
     * }, etc]
     */
    const newSitemaps = []

    const lists = await getLists()
    console.info('Sitemaps temp cache configured', cachedir)

    // Create the entry sitemap.xml file
    const f1Name = 'sitemap_collections.xml'
    const f1CachePath = normalize(join(cachedir, f1Name))
    const { sitemap: s1, file: f1 } = createSitemap(f1CachePath)
    await new Promise(async (res1, rej1) => {
      f1.on('finish', async () => {
        newSitemaps.push({ from: f1CachePath, to: normalize(join(clientAssetsDirectory, f1Name)) })
        res1()
      })

      s1.on('error', error => {
        console.error('Error generating main sitemap', error)
        rej1(error)
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
        try {
          await new Promise(async (res2, rej2) => {
            f2.on('finish', async () => {
              newSitemaps.push({
                from: f2CachePath,
                to: normalize(join(clientAssetsDirectory, f2Name)),
              })
              res2()
            })

            s2.on('error', error => {
              console.error(
                'Error generating sub-sitemaps. This is possible if a list of records are without DOIs',
                f2Name,
                error
              )
              rej2(error)
            })

            // Fetch records for this list
            const { hits: records } = await fetchElasticRecords({
              ctx: { elastic: { query: elasticQuery } },
              args: filter,
            })

            try {
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
            } catch (error) {
              console.error(
                "Error generating sub-sitemap files from Elasticsearch query (this shouldn't fail and needs to be looked at, but don't throw and error here!)",
                error
              )
            }

            // Close the child sitemap
            s2.end()
          })
        } catch {
          // This error should not crash the app and has already been logged
        }
      }

      // Close the main sitemap
      s1.end()
    })

    // Create new sitemaps
    for (const { from, to } of newSitemaps) {
      console.info('Regstering new sitemap', to)
      await copyFile(from, to)
    }

    // Remove obsolete sitemaps
    const newSitemapPaths = new Set(newSitemaps.map(({ to }) => to))
    const pathsToDelete = (await readdir(clientAssetsDirectory)).filter(
      p =>
        p.startsWith('sitemap') &&
        p.endsWith('.xml') &&
        !newSitemapPaths.has(normalize(join(clientAssetsDirectory, p)))
    )

    for (let p of pathsToDelete) {
      p = normalize(join(clientAssetsDirectory, p))
      console.info('Removing obsolute sitemap', p)
      await unlink(p)
    }

    // DONE
    const t1 = performance.now()
    const runtime = `${Math.round((t1 - t0) / 1000, 2)} seconds`
    console.info('Sitemap generated successfully', runtime)
  } catch (error) {
    console.error('ERROR Unable to generate sitemap', error?.message)
  } finally {
    lock = false
  }
}
