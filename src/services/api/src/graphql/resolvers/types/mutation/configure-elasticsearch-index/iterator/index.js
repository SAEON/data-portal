import fetch from 'node-fetch'
import {
  ODP_ADDRESS,
  CATALOGUE_API_ODP_INTEGRATION_BATCH_SIZE,
  CATALOGUE_API_ODP_DEBUG_IDS,
} from '../../../../../../config.js'
import parseDates from './_parse-dates.js'
import parseSpatial from './_parse-spatial.js'
import authenticateWithOdp from '../../../../../../lib/authenticate-with-odp.js'

const DEBUG_IDS = CATALOGUE_API_ODP_DEBUG_IDS.split(',')
  .filter(_ => _)
  .map(id => id.trim())

if (DEBUG_IDS?.length) {
  console.log('Debugging ODP integration ids', DEBUG_IDS)
}

const iterate = async ({ offset = 0, token }) => {
  const odpResponse = await fetch(
    `${ODP_ADDRESS}?limit=${CATALOGUE_API_ODP_INTEGRATION_BATCH_SIZE}&offset=${offset}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token,
      },
    }
  )

  const odpResponseJson = await odpResponse.json()
  const next = () => iterate({ offset: offset + odpResponseJson.length, token })
  const done = !odpResponseJson?.length

  const data = odpResponseJson
    .map(({ id, doi, institution, collection, projects, schema, metadata, published }, i) => {
      if (DEBUG_IDS.includes(id)) {
        console.log(id, JSON.stringify(odpResponseJson[i], null, 2))
      }

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
                    ? [key, parseDates(id, value)]
                    : key === 'geoLocations'
                    ? [key, parseSpatial(id, value)]
                    : [key, value]
                )
              ),
            }
          : undefined // publised === false
      } catch (error) {
        console.error(id, error.message)
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
