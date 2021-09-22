import fetch from 'node-fetch'
import {
  ODP_ADDRESS_CATALOGUE_ENDPOINT,
  ODP_INTEGRATION_BATCH_SIZE,
  ODP_DEBUG_IDS,
} from '../../../../../../config.js'
import parseDates from './_parse-dates.js'
import parseSpatial from './_parse-spatial.js'
import parseImmutableResource from './_parse-immutable-resource.js'
import authenticateWithOdp from '../../../../../../lib/authenticate-with-odp.js'

const DEBUG_IDS = ODP_DEBUG_IDS.split(',')
  .filter(_ => _)
  .map(id => id.trim())

if (DEBUG_IDS?.length) {
  console.debug('Debugging ODP integration ids', DEBUG_IDS)
}

const iterate = async ({ offset = 0, token }) => {
  const odpResponse = await fetch(
    `${ODP_ADDRESS_CATALOGUE_ENDPOINT}?limit=${ODP_INTEGRATION_BATCH_SIZE}&offset=${offset}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: token,
      },
    }
  ).catch(error => {
    console.error('Error fetching from ODP', error)
    throw error
  })

  const odpResponseJson = await odpResponse.json()
  const next = () => iterate({ offset: offset + odpResponseJson.length, token })
  const done = !odpResponseJson?.length

  /**
   * TODO what should sid do
   */

  const data = odpResponseJson
    .map(
      (
        {
          id,
          sid, // eslint-disable-line
          doi,
          institution_key: institution,
          collection_key: collection,
          project_keys: projects,
          schema_key: schema,
          metadata,
          published,
        },
        i
      ) => {
        if (DEBUG_IDS.includes(id) || DEBUG_IDS.includes(doi)) {
          console.debug('DEBUG', id, JSON.stringify(odpResponseJson[i], null, 2))
        }

        try {
          if (!published) {
            return undefined
          }

          return {
            id,
            doi,
            institution,
            collection,
            projects,
            schema,
            ...Object.fromEntries(
              Object.entries(metadata).map(([key, value]) =>
                key === 'immutableResource'
                  ? [key, parseImmutableResource(id, value)]
                  : key === 'dates'
                  ? [key, parseDates(id, value)]
                  : key === 'geoLocations'
                  ? [key, parseSpatial(id, value)]
                  : [key, value]
              )
            ),
          }
        } catch (error) {
          console.error(
            'ERROR processing record from the ODP. Try debugging by setting the ID for ODP_DEBUG_IDS',
            id,
            error.message
          )
          return undefined
        }
      }
    )
    // Filter away published === false
    .filter(_ => _)

  return {
    next,
    data,
    done,
  }
}

export const testConnection = () =>
  authenticateWithOdp()
    .then(({ token_type, access_token }) =>
      fetch(`${ODP_ADDRESS_CATALOGUE_ENDPOINT}?limit=1`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: [token_type, access_token].join(' '),
        },
      })
    )
    .catch(error => {
      throw new Error(`Cannot connect to the ODP. ${error}`)
    })

export const makeIterator = () =>
  authenticateWithOdp()
    .then(({ token_type, access_token }) =>
      iterate({ token: [token_type, access_token].join(' ') })
    )
    .catch(error => {
      throw new Error(`Error integrating with the ODP. ${error}`)
    })
