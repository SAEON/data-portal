import wkt from 'wkt'
const { parse } = wkt

export default async (_, args, ctx) => {
  const { catalogue } = ctx
  const { fields, filterByExtent, filterByTerms, limit: size } = args

  const order = { _key: 'asc', _count: 'desc' }
  const dsl = {
    size: 0,
    aggs: Object.fromEntries(
      fields.map(field => [
        field,
        {
          terms: {
            field,
            size,
            order,
          },
        },
      ])
    ),
  }

  if (filterByExtent || filterByTerms?.length) {
    dsl.query = {
      bool: {
        must: [],
      },
    }
  }

  if (filterByExtent) {
    // Our metadata shapes are specified in YX, rather than XY. So this translation is needed
    const shape = parse(filterByExtent)
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

  if (filterByTerms?.length) {
    dsl.query.bool.must = [
      ...dsl.query.bool.must,
      ...filterByTerms
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

  const result = await catalogue.query(dsl)
  return Object.entries(result.aggregations).map(([name, { buckets }]) => ({
    [name]: buckets,
  }))
}
