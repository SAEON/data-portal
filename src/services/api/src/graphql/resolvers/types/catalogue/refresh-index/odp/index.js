import fetch from 'node-fetch'
import { SAEON_ODP_PROVIDER } from '../../../../../../config.js'
import parseDates from './_parse-dates.js'
import parseSpatial from './_parse-spatial.js'

const ODP_BATCH_SIZE = 100

const iterate = (offset = 0) =>
  fetch(`${SAEON_ODP_PROVIDER}?limit=${ODP_BATCH_SIZE}&offset=${offset}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  })
    .then(res => res.json())
    .then(json => ({
      next: () => iterate(offset + json.length),
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

export default iterate
