import { parseDates, parseSpatial, parseImmutableResource } from '../transform/index.js'
import merge from './_merge-metadata-variants.js'

export default (log, data) => {
  return data.items.reduce(
    (items, item) => {
      const {
        id,
        doi,
        sid,
        collection_key,
        collection_name,
        provider_key,
        provider_name,
        metadata_records,
        tags,
        keywords,
        spatial_north,
        spatial_east,
        spatial_south,
        spatial_west,
        temporal_start,
        temporal_end,
        timestamp,
        published,
      } = item

      if (!published) {
        items.unpublish.push(id)
      } else {
        try {
          const record = metadata_records.map(
            ({
              schema_id: schemaId,
              schema_uri: schemaUri,
              metadata: { immutableResource, dates, geoLocations, ...other },
            }) => {
              return {
                schemaId,
                schemaUri,
                id,
                doi,
                sid,
                collection_key,
                collection_name,
                provider_key,
                provider_name,
                tags,
                keywords,
                spatial_north,
                spatial_east,
                spatial_south,
                spatial_west,
                temporal_start,
                temporal_end,
                timestamp,
                immutableResource: parseImmutableResource(id, immutableResource),
                dates: parseDates(id, dates),
                geoLocations: parseSpatial(
                  id,
                  geoLocations,
                  spatial_north,
                  spatial_east,
                  spatial_south,
                  spatial_west
                ),
                ...other,
              }
            }
          )

          items.publish.push(merge(...record))
        } catch (error) {
          console.error('ERROR processing published record from the ODP', id, error.message)
          log.brokenRecords.push(id)
        }
      }

      return items
    },
    {
      publish: [],
      unpublish: [],
    }
  )
}
