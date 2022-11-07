/**
 * Fuzziness
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#fuzziness
 */
const fields = {
  // Titles and text
  'titles.title': {},
  subtitle: {},
  'descriptions.description': {},

  // Institution
  institution: {},
  'institution.raw': {},

  // Collection
  collection: {},
  'collection.raw': {},

  // Creators
  'creators.name': {},
  'creators.name.raw': {},

  // Contributors
  'contributors.name': {},
  'contributors.name.raw': {},

  // Subjects
  'subjects.subject': {},
  'subjects.subject.raw': {},

  // DOI
  doi: {},
  'doi.raw': {
    boost: 2
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
    fields: Object.entries(fields).map(([field, {boost}]) => `${field}${boost ? `^${boost}` : ''}`)
  },
})
