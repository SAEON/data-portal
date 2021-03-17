import { GraphQLError } from 'graphql'
import buildDsl from './dsl/index.js'

/**
 * NOTE
 *
 * I haven't found a way to check if there is a previous page
 * if only a before cursor is specified (and the results.length
 * === pageSize). Pagination is not as good as it could be as a
 * result
 */

export default async (_, args, ctx) => {
  const { catalogue } = ctx

  const {
    size = 10000,
    ids = undefined,
    dois = undefined,
    text = undefined,
    extent = undefined,
    terms = undefined,
    identifiers = undefined,
  } = args

  let { before = undefined, after = undefined } = args

  if (size < 1 || size > 10000) {
    throw new Error('Size param must be between 1 and 200 (maximum page size)')
  }

  if (before && after) {
    throw new Error('Please specify either no cursor, a "before" or an "after" cursor (not both)')
  }

  if (before) {
    before = JSON.parse(Buffer.from(before, 'base64').toString('utf8'))
  }

  if (after) {
    after = JSON.parse(Buffer.from(after, 'base64').toString('utf8'))
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
    const cursor = before || after
    dsl.search_after = [cursor.score || 0, cursor.id]
  }

  const data = await catalogue.query(
    buildDsl({ dsl, ids, dois, text, terms, extent, identifiers, isAggregation: false })
  )

  if (data.error) {
    return new GraphQLError(`${JSON.stringify(data.error, null, 2)}`)
  }

  const totalCount = data.hits.total.value

  return {
    pageSize: size >= totalCount ? totalCount : size,
    totalCount,
    hasPreviousPage: undefined,
    hasNextPage: undefined,
    _firstResult:
      before === undefined ? data.hits.hits[0] : data.hits.hits[data.hits.hits.length - 1],
    _lastResult:
      before === undefined ? data.hits.hits[data.hits.hits.length - 1] : data.hits.hits[0],
    hits: data.hits.hits,
  }
}
