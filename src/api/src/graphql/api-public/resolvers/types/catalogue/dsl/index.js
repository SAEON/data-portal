import multiMatch from './_multi-match.js'
import geoShape from './_geo-shape.js'
import termsQuery from './_terms.js'
import doisQuery from './_dois.js'
import idsQuery from './_ids.js'
import min_score from './_min-score.js'

export default ({
  dsl, // The base query
  ids = [], // A list of ODP IDs
  dois = [], // A list of DOIs
  text, // Text to search
  terms, // Terms to search
  extent, // A GIS extent to limit by
  identifiers = [], // Allows for searching by DOIs or IDs without knowing before hand if a DOI or ID will be provided. DOIs and IDs are collapsed to this
}) => {
  if (terms?.length || text) {
    dsl.min_score = min_score
  }

  /**
   * Collapse DOIs, IDs, and identifiers args
   */
  identifiers = [...identifiers, ...ids, ...dois]
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
   * Text search applied to many field
   */
  if (text) {
    dsl.query.bool.must = [...dsl.query.bool.must, multiMatch(text.toLowerCase())]
  }

  /**
   * Terms (exact matches)
   */
  if (terms?.length) {
    dsl.query.bool.must = [...dsl.query.bool.must, ...termsQuery(terms)]
    dsl.query.bool.filter = [...dsl.query.bool.filter, ...termsQuery(terms)]
  }

  /**
   * Extent
   */
  if (extent) {
    dsl.query.bool.must = [...dsl.query.bool.must, geoShape(extent)]
    dsl.query.bool.filter = [...dsl.query.bool.filter, geoShape(extent)]
  }

  return dsl
}
