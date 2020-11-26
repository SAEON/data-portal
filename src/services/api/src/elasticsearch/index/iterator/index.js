import fetch from 'node-fetch'
import { ODP_ADDRESS } from '../../../config.js'
import parseDates from './_parse-dates.js'
import parseSpatial from './_parse-spatial.js'
import authenticateWithOdp from '../../../lib/authenticate-with-odp.js'

const ODP_BATCH_SIZE = 100

const iterate = async ({ offset = 0, token }) => {
  const odpResponse = await fetch(`${ODP_ADDRESS}?limit=${ODP_BATCH_SIZE}&offset=${offset}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token,
    },
  })

  const odpResponseJson = await odpResponse.json()
  const next = () => iterate({ offset: offset + odpResponseJson.length, token })
  const done = !odpResponseJson?.length

  const data = odpResponseJson
    .map(({ id, doi, institution, collection, projects, schema, metadata, published }) => {
      try {
        return published
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
                    ? [key, parseDates(value)]
                    : key === 'geoLocations'
                    ? [key, parseSpatial(value)]
                    : [key, value]
                )
              ),
            }
          : undefined // publised === false
      } catch (error) {
        console.error(
          'Error processing published metadata record into Elasticsearch. ID',
          id,
          error
        )
        return undefined
      }
    })
    // Filter away published === false
    .filter(_ => _)

  return {
    next,
    data,
    done,
  }
}

export default () =>
  authenticateWithOdp()
    .then(({ token_type, access_token }) =>
      iterate({ token: [token_type, access_token].join(' ') })
    )
    .catch(error => {
      throw new Error(`Error integrating with the ODP. ${error}`)
    })
