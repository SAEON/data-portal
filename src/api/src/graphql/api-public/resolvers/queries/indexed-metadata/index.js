import { ELASTICSEARCH_METADATA_INDEX } from '../../../../../config/index.js'
import mapToMetadata from '../../../../../lib/process-metadata/map-to-metadata.js'

export default async (self, { id = undefined }, ctx) => {
  const dsl = { size: 100 }

  if (id) {
    dsl.query = { term: { 'id.raw': id } }
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
