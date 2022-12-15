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
    listFilter = {},
    limit: size,
  } = args

  const facets = facetAggregations({ fields, size })
  const dsl = {
    size: 0,
    ...facets,
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
  if (
    extent ||
    terms?.length ||
    text ||
    ids?.length ||
    dois?.length ||
    identifiers?.length ||
    Object.keys(listFilter).length
  ) {
    dsl.query = {
      bool: {
        must: [],
        filter: [],
      },
    }
  }

  const body = buildDsl({
    dsl,
    ids,
    dois,
    text,
    terms,
    identifiers,
    extent,
    filter: listFilter,
    fields,
    facets,
  })

  if (LOG_QUERY_DETAILS) {
    console.info('ES DSL (AGG)', JSON.stringify(body, null, 2))
  }

  const result = await elastic.query({
    index: ELASTICSEARCH_CATALOGUE_INDEX,
    body,
  })

  const buckets = Object.entries(result.aggregations).map(([name, result]) => {
    return {
      [name]: result.facets.buckets,
    }
  })

  return buckets
}
