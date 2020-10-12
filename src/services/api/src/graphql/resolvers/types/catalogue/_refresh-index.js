import graphql from 'graphql'
import fetch from 'node-fetch'
import parse from 'date-fns/parse/index.js'
import lastDayOfYear from 'date-fns/lastDayOfYear/index.js'
import wkt from 'wkt'
import { ES_INDEX, ES_HOST_ADDRESS, CATALOGUE_SECRET } from '../../../../config.js'

const { stringify: createWkt_4326 } = wkt

const { GraphQLError } = graphql
const ODP_BATCH_SIZE = 100

const makeIterator = async (offset = 0) => {
  const uri = `https://odp.saeon.dvn/api/catalogue?limit=${ODP_BATCH_SIZE}&offset=${offset}`
  const results = await fetch(uri, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }).then(res => res.json())

  return {
    next: () => makeIterator(offset + results.length),
    data: results
      .map(({ id, doi, institution, collection, projects, schema, metadata, published }) =>
        published
          ? {
              id,
              doi,
              institution,
              collection,
              projects,
              schema,
              ...Object.fromEntries(
                Object.entries(metadata).map(([key, value]) =>
                  key === 'dates'
                    ? [
                        key,
                        value.map(({ date, dateType }) => {
                          const dateStrings = date.split('/')
                          const from = dateStrings[0]
                          const to = dateStrings[1] || dateStrings[0]
                          return {
                            gte: parse(from, 'yyyy-MM-dd', new Date()).toISOString(),
                            lte:
                              to === from
                                ? lastDayOfYear(parse(to, 'yyyy-MM-dd', new Date())).toISOString()
                                : parse(to, 'yyyy-MM-dd', new Date()).toISOString(),
                            dateType,
                          }
                        }),
                      ]
                    : key === 'geoLocations'
                    ? [
                        key,
                        value.map(({ geoLocationBox, geoLocationPoint }) => ({
                          geoLocationBox: geoLocationBox
                            ? createWkt_4326({
                                type: 'Polygon',
                                coordinates: [
                                  [
                                    [
                                      geoLocationBox.westBoundLongitude,
                                      geoLocationBox.northBoundLatitude,
                                    ],
                                    [
                                      geoLocationBox.eastBoundLongitude,
                                      geoLocationBox.northBoundLatitude,
                                    ],
                                    [
                                      geoLocationBox.eastBoundLongitude,
                                      geoLocationBox.southBoundLatitude,
                                    ],
                                    [
                                      geoLocationBox.westBoundLongitude,
                                      geoLocationBox.southBoundLatitude,
                                    ],
                                    [
                                      geoLocationBox.westBoundLongitude,
                                      geoLocationBox.northBoundLatitude,
                                    ],
                                  ],
                                ],
                              })
                            : undefined,
                          geoLocationPoint: geoLocationPoint ? geoLocationPoint : undefined,
                        })),
                      ]
                    : [key, value]
                )
              ),
            }
          : undefined
      )
      // Filter on published = true|false
      .filter(_ => _),
    done: !results.length,
  }
}

export default async (_, args) => {
  const { authorizationCode } = args
  if (authorizationCode !== CATALOGUE_SECRET) {
    throw new GraphQLError('Permission denied') // TODO. 401 ?
  }

  const result = {
    updated: 0,
    created: 0,
    error: false,
  }

  try {
    /**
     * For now, just delete and recreate the index on app start
     * Updating documents doesn't seem to update the mapping
     */
    await fetch(`${ES_HOST_ADDRESS}/${ES_INDEX}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => console.log(`${ES_INDEX} deleted on refresh`, json))
      .catch(error => {
        throw error
      })

    /**
     * Fetch from the source, and push to the destination in batches
     */
    let iterator = await makeIterator()
    while (!iterator.done) {
      const response = await fetch(`${ES_HOST_ADDRESS}/${ES_INDEX}/_bulk`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-ndjson',
        },
        body: iterator.data
          .map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`)
          .join(''),
      })
        .then(res => res.json())
        .then(json => {
          if (json.errors) {
            throw new Error(JSON.stringify(json.items))
          } else {
            return json
          }
        })
        .catch(error => {
          throw new Error(`Unable to refresh ES index :: ${error.message}`)
        })

      console.log(`Processed ${response.items.length} docs into the ${ES_INDEX} index`)
      response.items.forEach(({ index }) => (result[index.result] += 1))

      iterator = await iterator.next()
    }
  } catch (error) {
    result.error = error.message
  }

  return result
}
