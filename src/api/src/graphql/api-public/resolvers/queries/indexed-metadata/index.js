import { ELASTICSEARCH_METADATA_INDEX } from '../../../../../config/index.js'

export default async (self, { id = undefined }, ctx) => {
  const dsl = { size: 100 }
  if (id) {
    dsl.query = { term: { 'id.raw': id } }
  } else {
    dsl.query = { match_all: {} }
  }

  const { elastic } = ctx
  const res = await elastic.query({
    index: ELASTICSEARCH_METADATA_INDEX,
    body: dsl,
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
