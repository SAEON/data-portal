import wkt from 'wkt'
const { parse } = wkt
import matchFields from './_match-fields.js'

export default async (_, args, ctx) => {
  const { catalogue } = ctx

  const {
    size = 100,
    id = undefined,
    match = undefined,
    extent = undefined,
    terms = undefined,
    before = undefined,
    after = undefined,
    textSort = undefined,
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

  if (before || after) {
    const c = before || after
    dsl.search_after = [c.score || 0, c.id]
  }

  if (extent) {
    // Our metadata shapes are specified in YX, rather than XY. So this translation is needed
    const shape = parse(extent)
    shape.coordinates = shape.coordinates.map(array => array.map(([x, y]) => [y, x]))

    dsl.query.bool.must = [
      ...dsl.query.bool.must,
      {
        geo_shape: {
          'geoLocations.geoLocationBox.geo_shape': {
            shape,
            relation: 'within',
          },
        },
      },
    ]
  }

  if (id) {
    dsl.query = {
      multi_match: {
        query: id,
        fields: ['id'],
      },
    }
  } else {
    if (match) {
      dsl.query.bool.must = [
        ...dsl.query.bool.must,
        {
          multi_match: {
            query: match.toLowerCase(),
            fields: matchFields,
            type: 'best_fields',
            fuzziness: 'AUTO',
          },
        },
      ]
    }

    if (terms?.length) {
      dsl.query.bool.must = [
        ...dsl.query.bool.must,
        {
          bool: {
            should: terms
              .filter(({ field, value }) =>
                field === 'publicationYear' ? Boolean(parseInt(value), 10) : true
              )
              .map(({ field, value }) => ({ term: { [field]: value } })),
          },
        },
      ]
    }

    if (textSort) {
      dsl.query.bool.should = [
        {
          multi_match: {
            query: textSort.toLowerCase(),
            fields: matchFields,
            type: 'best_fields',
            fuzziness: 'AUTO',
          },
        },
      ]
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
