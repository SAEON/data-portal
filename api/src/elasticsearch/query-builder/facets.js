import buildDsl from './dsl/index.js'
import { ELASTICSEARCH_CATALOGUE_INDEX, LOG_QUERY_DETAILS } from '../../config/index.js'

/**
 * NOTE
 *
 * The aggregations allow for specifying sub-paths,
 * however the terms query does not use document fragments (path).
 * This is possible as sub-documents have "include_in_parent" = true
 * as part of the index mappings settings. But this could
 * result in unexpected query returns in some circumstances.
 *
 * For example, subjects are filtered by subjectScheme. If the
 * same subject existed for multiple schemes, then the query
 * and aggregation would return different results. In practice
 * this is unlikely.
 *
 * If this DOES occur, then the query that matches on subject scheme
 * will need to be adjusted (term I think)
 */

export default async ({ ctx, args }) => {
  const { elastic } = ctx
  const {
    fields,
    filterByText: text = undefined,
    filterByExtent: extent = undefined,
    filterByIds: ids = undefined,
    identifiers = undefined,
    filterByDois: dois = undefined,
    filterByTerms: terms = undefined,
    limit: size,
  } = args

  const dsl = {
    size: 0,
    aggs: Object.fromEntries(
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

        return [id, dsl]
      })
    ),
  }

  /**
   * It's fine to run an aggregation with no query
   * defined - that would just not limit the index
   * by a query
   *
   * It's also necessary to be able to run an aggregation
   * over a subset of docs. To do this, a query must be
   * defined in addition to the aggregation
   */
  if (extent || terms?.length || text || ids?.length || dois?.length || identifiers?.length) {
    dsl.query = {
      bool: {
        must: [],
        filter: [],
      },
    }
  }

  const body = buildDsl({ dsl, ids, dois, text, terms, identifiers, extent })

  if (LOG_QUERY_DETAILS) {
    console.info('ES DSL (AGG)', JSON.stringify(body, null, 2))
  }

  const result = await elastic.query({
    index: ELASTICSEARCH_CATALOGUE_INDEX,
    body,
  })

  return Object.entries(result.aggregations).map(([name, result]) => {
    const summaryResult = {
      [name]: undefined,
    }

    if (result[name][name]?.buckets) {
      summaryResult[name] = result[name][name].buckets
    } else if (result[name].buckets) {
      summaryResult[name] = result[name].buckets
    } else {
      throw new Error('Unexpected return from the Elasticsearch aggregation query')
    }

    return summaryResult
  })
}
