import fetch from 'make-fetch-happen'
import { differenceInDays } from 'date-fns'
import { readFile, stat, writeFile } from 'fs'
import { ExpiredException } from './_custom-exceptions.js'

const _fetch = uri => fetch(uri).then(res => res.json())

export const formatJson = json => json.map(str => str.replace(/-/g, '_')).join('\n')

const MAX_CACHE_AGE_DAYS = 10

/**
 * Try read the cache
 *  => If there's a cache and it isn't expired return contents
 *  => Otherwise fetch contents from URI, cache them and return them
 *
 * If the cache is expired, and the request for new content fails, use
 * the cache
 */
export default ({ cachePath, contentUri }) => {
  var staleData
  return new Promise((resolve, reject) =>
    readFile(cachePath, { encoding: 'utf8' }, (error, data) => {
      if (error) {
        return reject(error)
      } else {
        return new Promise((resolve, reject) =>
          stat(cachePath, (error, stats) => {
            if (error) {
              return reject(error)
            } else {
              const mtime = stats.mtime
              const daysOld = differenceInDays(mtime, new Date())
              if (daysOld > MAX_CACHE_AGE_DAYS) {
                staleData = data
                console.log('GraphQL schema', contentUri, 'cache expired')
                return reject(new ExpiredException(`${cachePath} is expired`))
              } else {
                console.log('GraphQL schema', contentUri, 'from cache')
                return resolve(formatJson(JSON.parse(data)))
              }
            }
          })
        )
          .then(res => resolve(res))
          .catch(error => reject(error))
      }
    })
  )
    .catch(async error => {
      let setCache = true
      if (error.code === 'ENOENT' || error.code === 'EXPIRED') {
        const json = await _fetch(contentUri)
          .then(res => {
            console.log('datacite', contentUri, 'new data')
            return res
          })
          .catch(error => {
            if (staleData) {
              console.log('datacite', contentUri, error.message, 'Using stale data')
              setCache = false
            } else {
              throw error
            }
          })
        return setCache
          ? await new Promise((resolve, reject) =>
              writeFile(cachePath, JSON.stringify(json), { encoding: 'utf8' }, error =>
                error ? reject(error) : resolve(formatJson(json))
              )
            ).catch(error => {
              throw error
            })
          : formatJson(JSON.parse(staleData))
      } else {
        throw error
      }
    })
    .catch(error => {
      console.error('datacite', contentUri, error.message, 'Unable to create GraphQL schema')
      process.exit(1)
    })
}
