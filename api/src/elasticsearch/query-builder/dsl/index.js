import multiMatch from './_multi-match.js'
import geoShape from './_geo-shape.js'
import termsQuery from './_terms.js'
import doisQuery from './_dois.js'
import idsQuery from './_ids.js'
import min_score from './_min-score.js'
export { default as facetAggregations } from './_facet-aggregations.js'
import rangeQuery from './_range.js'

const cleanText = (...text) =>
  [...text]
    .filter(_ => _)
    .join(' ')
    .split(' ')
    .map(t => t.trim())
    .filter(_ => _)

export default ({
  dsl = { query: { bool: {} } }, // The base query
  ids = [], // A list of ODP IDs
  dois = [], // A list of DOIs
  text, // Text to search
  terms, // Terms to search
  temporalRange: { from = undefined, to = undefined } = {},
  extent, // A GIS extent to limit by
  identifiers = [], // Allows for searching by DOIs or IDs without knowing before hand if a DOI or ID will be provided. DOIs and IDs are collapsed to this
  filter: listFilter = {}, // This defines a 'maximum' result set, and is the search used to create a list
}) => {
  if (terms?.length || text || listFilter.text) {
    dsl.min_score = min_score
  }

  if (text || listFilter.text) {
    text = cleanText(text, listFilter.text)
    dsl.query.bool.must = [
      ...dsl.query.bool.must,
      ...text.map(text => multiMatch(text.toLowerCase())),
    ]
  }

  /**
   * Collapse DOIs, IDs, and identifiers args
   */
  identifiers = [
    ...new Set([
      ...identifiers,
      ...ids,
      ...dois,
      ...(listFilter.identifiers || []),
      ...(listFilter.ids || []),
      ...(listFilter.dois || []),
    ]),
  ]
  if (identifiers && identifiers.length) {
    dsl.query.bool.should = [idsQuery(identifiers), doisQuery(identifiers)]
    dsl.query.bool.filter = [
      ...(dsl.query.bool.filter || []),
      {
        bool: {
          should: [idsQuery(identifiers), doisQuery(identifiers)],
        },
      },
    ]
  }

  /**
   * Terms (exact matches)
   */
  if (terms?.length || listFilter.terms?.length) {
    terms = [...new Set([...(terms || []), ...(listFilter.terms || [])])].filter(_ => _)
    dsl.query.bool.must = [...dsl.query.bool.must, ...termsQuery(terms)]
    dsl.query.bool.filter = [...dsl.query.bool.filter, ...termsQuery(terms)]
  }

  /**
   * If a temporal range is specified,
   * only return results with a "valid"
   * date
   **/
  if (from || to) {
    const q = {
      bool: {
        must: [
          {
            nested: {
              path: 'dates',
              query: {
                bool: {
                  must: [
                    from
                      ? rangeQuery({ field: 'dates.gte', value: from, context: 'from' })
                      : undefined,
                    to ? rangeQuery({ field: 'dates.lte', value: to, context: 'to' }) : undefined,
                    {
                      match: {
                        'dates.dateType': 'valid',
                      },
                    },
                  ].filter(Boolean),
                },
              },
            },
          },
        ],
      },
    }

    dsl.query.bool.must = [...dsl.query.bool.must, q]
    dsl.query.bool.filter = [...dsl.query.bool.filter, q]
  }
  /**
   * Extent
   */
  if (extent || listFilter.extent) {
    extent = [extent || null, listFilter.extent || null].filter(_ => _).map(e => geoShape(e))
    dsl.query.bool.must = [...dsl.query.bool.must, ...extent]
    dsl.query.bool.filter = [...dsl.query.bool.filter, ...extent]
  }

  return dsl
}
