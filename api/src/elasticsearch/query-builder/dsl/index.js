import multiMatch from './_multi-match.js'
import geoShape from './_geo-shape.js'
import termsQuery from './_terms.js'
import doisQuery from './_dois.js'
import idsQuery from './_ids.js'
import min_score from './_min-score.js'

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
  filter = {}, // This defines a 'maximum' result set, and is the search used to create a list
}) => {
  if (terms?.length || text || filter.text) {
    dsl.min_score = min_score
  }

  if (text || filter.text) {
    text = cleanText(text, filter.text)
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
      ...(filter.identifiers || []),
      ...(filter.ids || []),
      ...(filter.dois || []),
    ]),
  ]
  if (identifiers && identifiers.length) {
    dsl.query.bool.should = [idsQuery(identifiers), doisQuery(identifiers)]
    dsl.query.bool.filter = [
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
  if (terms?.length || filter.terms?.length) {
    terms = [...new Set([...(terms || []), ...(filter.terms || [])])].filter(_ => _)
    dsl.query.bool.must = [...dsl.query.bool.must, ...termsQuery(terms)]
    dsl.query.bool.filter = [...dsl.query.bool.filter, ...termsQuery(terms)]
  }

  /**
   * Extent
   */
  if (extent || filter.extent) {
    extent = [extent || null, filter.extent || null].filter(_ => _).map(e => geoShape(e))
    dsl.query.bool.must = [...dsl.query.bool.must, ...extent]
    dsl.query.bool.filter = [...dsl.query.bool.filter, ...extent]
  }

  return dsl
}
