import { parseDates, parseSpatial, parseImmutableResource } from '../transform/index.js'

export default data =>
  data
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
            'ERROR processing record from the ODP',
            id,
            error.message
          )
          return undefined
        }
      }
    )
    // Filter away published === false
    .filter(_ => _)
