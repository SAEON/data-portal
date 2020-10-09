/**
 * Fuzziness
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#fuzziness
 */
const fields = {
  // Titles and text
  'titles.title': { boost: 5, fuzziness: 1 },
  subtitle: { boost: 2, fuzziness: 1 },
  'descriptions.description': { boost: 5, fuzziness: 1 },

  // Creators
  'creators.name': { boost: 2, fuzziness: 3 },
  'creators.name.raw': { boost: 10, fuzziness: 0 },

  // Contributors
  'contributors.name': { boost: 2, fuzziness: 2 },
  'contributors.name.raw': { boost: 10, fuzziness: 0 },

  // Subjects
  'subjects.subject': { boost: 2, fuzziness: 'AUTO' },
  'subjects.subject.raw': { boost: 10, fuzziness: 0 },

  // DOI
  'identifier.identifier.raw': { boost: 100, fuzziness: 0 },
}

/**
 * Using many match queries allows for configuring boost,
 * whereas a multi_match query that will always have higher
 * scores since the scores are calculated across many fields
 */
export default query => ({
  bool: {
    should: Object.entries(fields).map(([field, { boost, fuzziness }]) => ({
      match: {
        [field]: {
          query,
          boost,
          fuzziness,
        },
      },
    })),
  },
})
