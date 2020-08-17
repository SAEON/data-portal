import wkt from 'wkt'
const { parse } = wkt
import matchFields from './_match-fields.js'

export default async (_, args, ctx) => {
  const { catalogue } = ctx

  const {
    id,
    match = undefined,
    extent = undefined,
    terms,
    size = 100,
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
      {
        'id.raw': before === undefined ? 'asc' : 'desc',
      },
    ],
  }

  if (before || after) {
    dsl.search_after = [before || after]
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
        fields: ['alternateIdentifiers.alternateIdentifier'],
      },
    }
  } else {
    if (match) {
      dsl.query.bool.must = [
        ...dsl.query.bool.must,
        {
          multi_match: {
            query: match,
            type: 'best_fields',
            fields: matchFields,
            fuzziness: 'AUTO',
          },
        },
      ]
    }

    if (terms?.length) {
      dsl.query.bool.must = [
        ...dsl.query.bool.must,
        ...terms
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
          }),
      ]
    }
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
