import buildDsl from './dsl/index.js'

export default async (_, args, ctx) => {
  const { catalogue } = ctx
  const {
    fields,
    filterByText: text = undefined,
    filterByExtent: extent = undefined,
    filterByIds: ids = undefined,
    identifiers = undefined,
    filterByDois: dois = undefined,
    filterByTerms: terms = undefined,
    path = undefined,
    limit: size,
  } = args

  const order = { _key: 'asc', _count: 'desc' }
  const dsl = {
    size: 0,
    aggs: Object.fromEntries(
      fields.map(({ field, filter }) => {
        const dsl = {
          nested: {
            path,
          },
          aggs: {
            [field]: {
              aggs: {
                [field]: {
                  terms: {
                    field,
                    size,
                    order,
                  },
                },
              },
            },
          },
        }

        if (filter) {
          const { field: filterField, values: filterValues } = filter
          dsl.aggs[field].filter = {
            terms: {
              [filterField]: filterValues,
            },
          }
        } else {
          dsl.aggs[field].filter = {
            exists: {
              field,
            },
          }
        }

        return [field, dsl]
      })
    ),
  }

  console.log(JSON.stringify(dsl))

  const result = await catalogue.query(
    buildDsl({ dsl, ids, dois, text, terms, identifiers, extent, isAggregation: true })
  )

  return Object.entries(result.aggregations).map(([name, result]) => {
    console.log(result[name][name])
    return {
      [name]: result[name][name].buckets,
    }
  })
}
