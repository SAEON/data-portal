import buildDsl, { facetAggregations } from './dsl/index.js'
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
    filterByTemporalRange: temporalRange = undefined,
    listFilter = {},
    limit: size,
  } = args

  const facets = facetAggregations({ fields, size })

  const body = buildDsl({
    dsl: {
      size: 0,
      aggs: facets,
      query: {
        bool: {
          must: [],
          filter: [],
        },
      },
    },
    ids,
    dois,
    text,
    terms,
    temporalRange,
    identifiers,
    extent,
    filter: listFilter,
  })

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
