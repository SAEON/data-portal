import buildDsl from './dsl/index.js'

export default async (_, args, ctx) => {
  const { catalogue } = ctx
  const {
    fields,
    filterByText: text = undefined,
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

  const result = await catalogue.query(
    buildDsl({ dsl, ids, dois, text, terms, extent, isAggregation: true })
  )

  return Object.entries(result.aggregations).map(([name, { buckets }]) => ({
    [name]: buckets,
  }))
}
