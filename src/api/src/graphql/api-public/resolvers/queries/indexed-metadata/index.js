import { ELASTICSEARCH_METADATA_INDEX } from '../../../../../config/index.js'
import mapToMetadata from '../../../../../lib/process-metadata/map-to-metadata.js'

export default async (self, { ids = undefined }, ctx) => {
  const dsl = { size: 500 }

  if (ids) {
    dsl.query = { terms: { 'id.raw': ids } }
  } else {
    dsl.query = { match_all: {} }
  }

  return mapToMetadata(
    await ctx.elastic.query({
      index: ELASTICSEARCH_METADATA_INDEX,
      body: dsl,
    })
  )
}
