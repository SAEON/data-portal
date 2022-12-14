import multiMatch from './_multi-match.js'
import geoShape from './_geo-shape.js'
import termsQuery from './_terms.js'
import doisQuery from './_dois.js'
import idsQuery from './_ids.js'
import min_score from './_min-score.js'
import { getFilters as _getFilters } from './_facet-aggregations.js'
export { default as facetAggregations } from './_facet-aggregations.js'
export const getFilters = _getFilters

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
  extent, // A GIS extent to limit by
  identifiers = [], // Allows for searching by DOIs or IDs without knowing before hand if a DOI or ID will be provided. DOIs and IDs are collapsed to this
  filter: listFilter = {}, // This defines a 'maximum' result set, and is the search used to create a list
  fields = [], // Client facet configuration list. When facets are used for filtering, these filters should be applied to the search
  facets = {},
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
    const facetFilters = terms
      .map(({ id }) => {
        const field = fields.find(({ id: _id }) => id === _id)
        return getFilters(facets[id], field)
      })
      .flat()
      .filter(_ => _)
      .map(obj => obj || obj)
      .flat()

    dsl.query.bool.must = [...dsl.query.bool.must, ...termsQuery(terms), ...facetFilters]
    dsl.query.bool.filter = [...dsl.query.bool.filter, ...termsQuery(terms), ...facetFilters]
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
