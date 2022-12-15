// const wrapNested = (path, obj) => {
//   if (path) {
//     return {
//       nested: {
//         path,
//         query: {
//           ...obj,
//         },
//       },
//     }
//   }

//   return obj
// }

const facetAggregations = ({ fields, size }) => {
  const aggregations = {
    aggs: {},
  }
  Object.fromEntries(
    fields.map(({ id, field, filters = [], path, sortBy = '_count', sortOrder = 'desc' }) => {
      const order = { [sortBy]: sortOrder }
      aggregations.aggs[id] = {
        filter: {
          bool: {
            must: [
              {
                exists: {
                  field,
                },
              },
              ...filters.map(({ field, values, includeIfMissingField }) => {
                console.log(field, values)
                return {
                  terms: {
                    [field]: values,
                  },
                }
              }),
            ].filter(_ => _),
          },
        },
        aggs: {
          facets: {
            terms: {
              field,
              size,
              order,
            },
          },
        },
      }

      // filters.forEach(({ field, values, includeIfMissingField }) => {
      //   const query = {
      //     bool: {
      //       should: [
      //         {
      //           terms: {
      //             [field]: values,
      //           },
      //         },
      //         includeIfMissingField
      //           ? {
      //               bool: {
      //                 must_not: {
      //                   exists: {
      //                     field,
      //                   },
      //                 },
      //               },
      //             }
      //           : null,
      //       ].filter(_ => _),
      //     },
      //   }

      // aggregations.aggs[id].filter.bool.must.push(query)
      // })

      return [id, aggregations]
    })
  )

  return aggregations
}

/**
 * "field" is accepted as an argument in case
 * addition information on the field is required
 */
export const getFilters = (facet, field) => {
  if (!facet) {
    return null
  }

  if (facet.filter) {
    return [facet.filter]
  }

  return Object.entries(facet.aggs).reduce((a, [, { aggs, filter }]) => {
    filter = filter || Object.entries(aggs)[0][1].filter
    return [...a, filter]
  }, [])
}

export default facetAggregations
