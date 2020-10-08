const fields = {
  'titles.title': 3,
  'descriptions.description': 2,
  'creators.name': 2,
  subtitle: 1,
  'contributors.name': 2,
  'subjects.subject': 1,
  'identifier.identifier.raw_lowercase': 10,
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
            boost: fields['titles.title'],
          },
        },
      },
      {
        match: {
          'descriptions.description': {
            query: txt,
            boost: fields['descriptions.description'],
          },
        },
      },
      {
        match: {
          'creators.name': {
            query: txt,
            boost: fields['creators.name'],
          },
        },
      },
      {
        match: {
          subtitle: {
            query: txt,
            boost: fields.subtitle,
          },
        },
      },
      {
        match: {
          'contributors.name': {
            query: txt,
            boost: fields['contributors.name'],
          },
        },
      },
      {
        match: {
          'subjects.subject': {
            query: txt,
            boost: fields['subjects.subject'],
          },
        },
      },
      {
        match: {
          'identifier.identifier.raw_lowercase': {
            query: txt,
            boost: fields['identifier.identifier.raw_lowercase'],
          },
        },
      },
    ],
  },
})
