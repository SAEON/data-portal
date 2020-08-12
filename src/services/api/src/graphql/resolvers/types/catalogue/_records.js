import graphql from 'graphql/index.js'
const { GraphQLError } = graphql

export default async (_, args, ctx) => {
  const { catalogue } = ctx

  const { id, subjects, size = 100, before = undefined, after = undefined } = args
  if (size < 1 || size > 10000) {
    throw new GraphQLError('Size param must be between 1 and 10 000')
  }
  if (before && after) {
    throw new GraphQLError('Please specify either a "before" or an "after" cursor (not both)')
  }

  const dsl = {
    size,
    query: {
      bool: {
        must: [],
      },
    },
    sort: [
      {
        _id: before === undefined ? 'asc' : 'desc',
      },
    ],
    _source: {
      excludes: ['metadata_json.originalMetadata'],
      includes: ['metadata_json.*'],
    },
  }

  if (before || after) {
    dsl.search_after = [before || after]
  }

  if (id) {
    dsl.query = {
      multi_match: {
        query: id,
        fields: ['metadata_json.alternateIdentifiers.alternateIdentifier'],
      },
    }
  } else if (subjects && subjects.length) {
    dsl.query.bool.must = [
      subjects
        .filter(_ => _)
        .map(subject => {
          const phrase = {
            bool: {
              should: parseInt(subject)
                ? [{ match: { 'metadata_json.publicationYear': subject } }]
                : [
                    { term: { 'metadata_json.subjects.subject.raw': subject } },
                    { match: { 'metadata_json.publisher.raw': subject } },
                  ],
            },
          }

          return phrase
        }),
    ]
  }

  const data = await catalogue.query(dsl)

  return {
    _firstResult:
      before === undefined ? data.hits.hits[0] : data.hits.hits[data.hits.hits.length - 1],
    _lastResult:
      before === undefined ? data.hits.hits[data.hits.hits.length - 1] : data.hits.hits[0],
    data: data.hits.hits,
    totalCount: data.hits.total,
  }
}
