/**
 * Fuzziness
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#fuzziness
 */
const fields = {
  'titles.title': {},
  'titles.title.raw': {},

  subtitle: {},

  'descriptions.description': {},

  institution: {},
  'institution.raw': {},

  collection: {},
  'collection.raw': {},

  'creators.name': {},
  'creators.name.raw': {},

  'contributors.name': {},
  'contributors.name.raw': {},

  'subjects.subject': {},
  'subjects.subject.raw': {},

  // DOI
  doi: {},
  'doi.raw': {
    boost: 2,
  },
}

/**
 * Using many match queries allows for configuring boost,
 * whereas a multi_match query that will always have higher
 * scores since the scores are calculated across many fields
 */
export default query => ({
  multi_match: {
    query,
    type: 'best_fields',
    fields: Object.entries(fields).map(
      ([field, { boost }]) => `${field}${boost ? `^${boost}` : ''}`
    ),
  },
})
