const facetAggregations = ({ fields, size }) =>
  Object.fromEntries(
    fields.map(({ id, field, filters, path, sortBy = '_count', sortOrder = 'desc' }) => {
      const order = { [sortBy]: sortOrder }
      const dsl = {}

      /**
       * The path indicates that sub-documents are being searched
       * By default Elasticsearch flattens documents so that all fields
       * are top level (i.e. field names contain dots and array positions)
       * in the case of flattening nested objects and arrays
       *
       * But this means that when aggregating a sub-document, if one field
       * item matches then ALL items are returned!
       *
       * Sub-documents get around this. If a 'path' (to a sub-document) is
       * included in the args, then the aggregation is on sub-documents
       */
      if (path) {
        dsl.nested = { path }
        dsl.aggs = {
          [id]: {
            aggs: {
              [id]: {
                aggs: {
                  top_reverse_nested: {
                    reverse_nested: {},
                  },
                },
                terms: {
                  field,
                  size,
                  order,
                },
              },
            },
          },
        }
      } else {
        dsl.aggs = {
          [id]: {
            terms: {
              field,
              size,
              order,
            },
          },
        }
      }

      /**
       * Even if a filter is not specified, a simple
       * 'exists' filter is still required. Otherwise
       * there is a different aggregation structure w/wo
       * filters, on top of the different aggregation structure
       * w/wo path. Including a superfluous 'exists' filter
       * simplifies this
       *
       * NOTE filters are 'AND' bound. i.e. ALL conditions have
       * to be met
       */
      let _filter
      if (filters) {
        _filter = {
          bool: {
            must: [],
          },
        }
        filters.forEach(
          ({ field: filterField, values: filterValues, includeIfMissingField = undefined }) => {
            if (includeIfMissingField) {
              _filter.bool.must = [
                ..._filter.bool.must,
                {
                  bool: {
                    should: [
                      {
                        bool: {
                          must_not: {
                            exists: {
                              field: filterField,
                            },
                          },
                        },
                      },
                      {
                        terms: {
                          [filterField]: filterValues,
                        },
                      },
                    ],
                  },
                },
              ]
            } else {
              _filter.bool.must = [
                ..._filter.bool.must,
                {
                  terms: {
                    [filterField]: filterValues,
                  },
                },
              ]
            }
          }
        )
      } else {
        _filter = {
          exists: {
            field,
          },
        }
      }

      /**
       * The filter is put in a different place on the
       * aggregation query depending on if the aggregation
       * is across sub-documents (path === true) or not
       */
      if (path) {
        dsl.aggs[id].filter = _filter
      } else {
        dsl.filter = _filter
      }

      /**
       * Hide the original fieldname on the DSL object
       * for easily accessing the field in the ES index
       * that this filter applies to
       */
      Object.defineProperty(dsl, 'field', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: field,
      })

      return [id, dsl]
    })
  )

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

    if (field.path) {
      if (filter.bool?.must) {
        filter.bool.must = filter.bool.must.map(f => ({
          nested: {
            path: field.path,
            query: {
              ...f,
            },
          },
        }))
      }
    }

    return [...a, filter]
  }, [])
}

export default facetAggregations
