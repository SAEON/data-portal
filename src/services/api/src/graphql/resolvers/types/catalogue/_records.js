import graphql from 'graphql/index.js'
const { GraphQLError } = graphql

export default async (_, args, ctx) => {
  const { catalogue } = ctx

  const { id, terms, size = 100, before = undefined, after = undefined } = args
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
  }

  if (before || after) {
    dsl.search_after = [before || after]
  }

  if (id) {
    dsl.query = {
      multi_match: {
        query: id,
        fields: ['alternateIdentifiers.alternateIdentifier'],
      },
    }
  } else if (terms && terms.length) {
    dsl.query.bool.must = terms
      .filter(_ => _)
      .map(term => {
        const phrase = {
          bool: {
            should: parseInt(term)
              ? [{ match: { publicationYear: term } }]
              : [
                  { term: { 'subjects.subject.raw': term } },
                  { term: { 'publisher.raw': term } },
                  { term: { 'creators.name.raw': term } },
                ],
          },
        }
        return phrase
      })
  }

  const data = await catalogue.query(dsl)

  return {
    _firstResult:
      before === undefined ? data.hits.hits[0] : data.hits.hits[data.hits.hits.length - 1],
    _lastResult:
      before === undefined ? data.hits.hits[data.hits.hits.length - 1] : data.hits.hits[0],
    data: data.hits.hits,
    totalCount: data.hits.total.value,
  }
}
