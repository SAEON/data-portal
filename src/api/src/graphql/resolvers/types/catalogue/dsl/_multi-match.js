/**
 * Fuzziness
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#fuzziness
 */
const fields = {
  // Titles and text
  'titles.title': { boost: undefined, fuzziness: 'AUTO' },
  subtitle: { boost: undefined, fuzziness: 'AUTO' },
  'descriptions.description': { boost: undefined, fuzziness: 'AUTO' },

  // Institution
  institution: { boost: undefined, fuzziness: 'AUTO' },
  'institution.raw': { boost: undefined, fuzziness: 'AUTO' },

  // Collection
  collection: { boost: undefined, fuzziness: 'AUTO' },
  'collection.raw': { boost: undefined, fuzziness: 'AUTO' },

  // Creators
  'creators.name': { boost: undefined, fuzziness: 'AUTO' },
  'creators.name.raw': { boost: undefined, fuzziness: 'AUTO' },

  // Contributors
  'contributors.name': { boost: undefined, fuzziness: 'AUTO' },
  'contributors.name.raw': { boost: undefined, fuzziness: 'AUTO' },

  // Subjects
  'subjects.subject': { boost: undefined, fuzziness: 'AUTO' },
  'subjects.subject.raw': { boost: undefined, fuzziness: 'AUTO' },

  // DOI
  doi: { boost: undefined, fuzziness: 'AUTO' },
  'doi.raw': { boost: undefined, fuzziness: 'AUTO' },
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
