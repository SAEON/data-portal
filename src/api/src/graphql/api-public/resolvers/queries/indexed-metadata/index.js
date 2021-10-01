import { ELASTICSEARCH_METADATA_INDEX } from '../../../../../config/index.js'

export default async (self, args, ctx) => {
  const { elastic } = ctx
  const res = await elastic.query({
    index: ELASTICSEARCH_METADATA_INDEX,
    body: { query: { match_all: {} } },
  })
  return res.body.hits.hits.map(({ _source }) => {
    const { id, doi, sid, institution, collection, schema, validated, errors, state, ...metadata } =
      _source

    return {
      id,
      doi,
      sid,
      institution,
      collection,
      schema,
      validated,
      errors,
      state,
      metadata: { ...metadata },
    }
  })
}
