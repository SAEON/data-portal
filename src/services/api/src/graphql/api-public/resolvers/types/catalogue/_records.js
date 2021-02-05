import { GraphQLError } from 'graphql'
import buildDsl from './dsl/index.js'

export default async (_, args, ctx) => {
  const { catalogue } = ctx

  const {
    size = 100,
    ids = undefined,
    dois = undefined,
    text = undefined,
    extent = undefined,
    terms = undefined,
    before = undefined,
    after = undefined,
    identifiers = undefined,
  } = args

  if (size < 1 || size > 10000) {
    throw new Error('Size param must be between 1 and 10 000')
  }

  if (before && after) {
    throw new Error('Please specify either a "before" or an "after" cursor (not both)')
  }

  const dsl = {
    size,
    query: {
      bool: {
        must: [],
        filter: [],
      },
    },
    sort: [
      { _score: before ? 'asc' : 'desc' },
      {
        'id.raw': before ? 'asc' : 'desc',
      },
    ],
  }

  if (before || after) {
    const c = before || after
    dsl.search_after = [c.score || 0, c.id]
  }

  const data = await catalogue.query(
    buildDsl({ dsl, ids, dois, text, terms, extent, identifiers, isAggregation: false })
  )

  if (data.error) {
    return new GraphQLError(`${JSON.stringify(data.error, null, 2)}`)
  }

  return {
    _firstResult:
      before === undefined ? data.hits.hits[0] : data.hits.hits[data.hits.hits.length - 1],
    _lastResult:
      before === undefined ? data.hits.hits[data.hits.hits.length - 1] : data.hits.hits[0],
    hits: data.hits.hits,
    totalCount: data.hits.total.value,
  }
}
