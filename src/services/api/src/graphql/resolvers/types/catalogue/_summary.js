import {
  multiMatch,
  geoShape,
  termsQuery,
  doisQuery,
  idsQuery,
  minScore as min_score,
} from './dsl/index.js'

export default async (_, args, ctx) => {
  const { catalogue } = ctx
  const {
    fields,
    filterByText: match = undefined,
    filterByExtent: extent = undefined,
    filterByIds: ids = undefined,
    filterByDois: dois = undefined,
    filterByTerms: terms = undefined,
    limit: size,
  } = args

  const order = { _key: 'asc', _count: 'desc' }
  const dsl = {
    size: 0,
    aggs: Object.fromEntries(
      fields.map(field => [
        field,
        {
          terms: {
            field,
            size,
            order,
          },
        },
      ])
    ),
  }

  if (extent || terms?.length || match || ids?.length || dois?.length) {
    dsl.min_score = min_score
    dsl.query = {
      bool: {
        must: [],
      },
    }
  }

  if (ids && ids.length) {
    dsl.query.bool.must = [idsQuery(ids)]
  } else if (dois && dois.length) {
    dsl.query.bool.must = [doisQuery(dois)]
  } else {
    if (extent) {
      dsl.query.bool.must = [...dsl.query.bool.must, geoShape(extent)]
    }
    if (match) {
      dsl.query.bool.must = [...dsl.query.bool.must, multiMatch(match.toLowerCase())]
    }
    if (terms?.length) {
      dsl.query.bool.must = [...dsl.query.bool.must, ...termsQuery(terms)]
    }
  }

  const result = await catalogue.query(dsl)
  return Object.entries(result.aggregations).map(([name, { buckets }]) => ({
    [name]: buckets,
  }))
}
