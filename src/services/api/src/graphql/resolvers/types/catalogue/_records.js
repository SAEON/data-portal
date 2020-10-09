import {
  multiMatch,
  geoShape,
  termsQuery,
  doisQuery,
  idsQuery,
  minScore as min_score,
} from './dsl/index.js'

export default async (_, args, ctx) => {
  const { catalogue } = ctx

  const {
    size = 100,
    ids = undefined,
    dois = undefined,
    match = undefined,
    extent = undefined,
    terms = undefined,
    before = undefined,
    after = undefined,
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
      },
    },
    sort: [
      { _score: before ? 'asc' : 'desc' },
      {
        'id.raw': before ? 'asc' : 'desc',
      },
    ],
  }

  if (match || extent || terms?.length) {
    dsl.min_score = min_score
  }

  if (before || after) {
    const c = before || after
    dsl.search_after = [c.score || 0, c.id]
  }

  if (ids && ids.length) {
    dsl.size = ids.length
    dsl.query.bool.must = [idsQuery(ids)]
  } else if (dois && dois.length) {
    dsl.size = dois.length
    dsl.query.bool.must = [doisQuery(dois)]
  } else {
    if (extent) {
      dsl.query.bool.must = [...dsl.query.bool.must, geoShape(extent)]
    }
    if (match) {
      dsl.query.bool.must = [...dsl.query.bool.must, multiMatch(match.toLowerCase())]
    }
    if (terms?.length) {
      dsl.query.bool.must = [...dsl.query.bool.must, ...termsQuery(terms)]
    }
  }

  const data = await catalogue.query(dsl)

  return {
    _firstResult:
      before === undefined ? data.hits.hits[0] : data.hits.hits[data.hits.hits.length - 1],
    _lastResult:
      before === undefined ? data.hits.hits[data.hits.hits.length - 1] : data.hits.hits[0],
    hits: data.hits.hits,
    totalCount: data.hits.total.value,
  }
}
