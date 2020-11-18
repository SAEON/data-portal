import fetch from 'node-fetch'
import { ODP_ADDRESS } from '../../../config.js'
import parseDates from './_parse-dates.js'
import parseSpatial from './_parse-spatial.js'
import authenticateWithOdp from '../../../lib/authenticate-with-odp.js'

const ODP_BATCH_SIZE = 100

const iterate = ({ offset = 0, token }) =>
  fetch(`${ODP_ADDRESS}?limit=${ODP_BATCH_SIZE}&offset=${offset}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: token,
    },
  })
    .then(res => res.json())
    .then(json => ({
      next: () => iterate({ offset: offset + json.length }),
      data: json
        .map(
          ({ id, doi, institution, collection, projects, schema, metadata, published }) =>
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
                        ? [key, parseDates(value)]
                        : key === 'geoLocations'
                        ? [key, parseSpatial(value)]
                        : [key, value]
                    )
                  ),
                }
              : undefined // publised === false
        )
        // Filter away published === false
        .filter(_ => _),
      done: !json.length,
    }))

export default () =>
  authenticateWithOdp()
    .then(({ token_type, access_token }) =>
      iterate({ token: [token_type, access_token].join(' ') })
    )
    .catch(error => {
      throw error
    })
