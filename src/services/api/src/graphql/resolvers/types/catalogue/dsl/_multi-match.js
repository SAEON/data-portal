/**
 * Fuzziness
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#fuzziness
 */
const fields = {
  'titles.title': { boost: 3, fuzziness: 'AUTO' },
  'descriptions.description': { boost: 2, fuzziness: 'AUTO' },
  'creators.name': { boost: 2, fuzziness: 2 },
  subtitle: { boost: 1, fuzziness: 'AUTO' },
  'contributors.name': { boost: 2, fuzziness: 2 },
  'subjects.subject': { boost: 2, fuzziness: 'AUTO' },
  'identifier.identifier.raw_lowercase': { boost: 10, fuzziness: 0 },
}

/**
 * Using many match queries allows for configuring boost,
 * whereas a multi_match query that will always have higher
 * scores since the scores are calculated across many fields
 */
export default txt => ({
  bool: {
    should: [
      {
        match: {
          'titles.title': {
            query: txt,
            boost: fields['titles.title'].boost,
            fuzziness: fields['titles.title'].fuzziness,
          },
        },
      },
      {
        match: {
          'descriptions.description': {
            query: txt,
            boost: fields['descriptions.description'].boost,
            fuzziness: fields['descriptions.description'].fuzziness,
          },
        },
      },
      {
        match: {
          'creators.name': {
            query: txt,
            boost: fields['creators.name'].boost,
            fuzziness: fields['creators.name'].fuzziness,
          },
        },
      },
      {
        match: {
          subtitle: {
            query: txt,
            boost: fields.subtitle.boost,
            fuzziness: fields.subtitle.fuzziness,
          },
        },
      },
      {
        match: {
          'contributors.name': {
            query: txt,
            boost: fields['contributors.name'].boost,
            fuzziness: fields['contributors.name'].fuzziness,
          },
        },
      },
      {
        match: {
          'subjects.subject': {
            query: txt,
            boost: fields['subjects.subject'].boost,
            fuzziness: fields['subjects.subject'].fuzziness,
          },
        },
      },
      {
        match: {
          'identifier.identifier.raw_lowercase': {
            query: txt,
            boost: fields['identifier.identifier.raw_lowercase'].boost,
            fuzziness: fields['identifier.identifier.raw_lowercase'].fuzziness,
          },
        },
      },
    ],
  },
})
