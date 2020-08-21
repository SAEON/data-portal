import wkt from 'wkt'
const { parse } = wkt
import matchFields from './_match-fields.js'

export default async (_, args, ctx) => {
  const { catalogue } = ctx
  const { fields, filterByText, filterByExtent, filterByTerms: terms, limit: size } = args
  console.log(terms)

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

  if (filterByExtent || terms?.length || filterByText) {
    dsl.query = {
      bool: {
        must: [],
      },
    }
  }

  if (filterByText) {
    dsl.query.bool.must = [
      ...dsl.query.bool.must,
      {
        multi_match: {
          query: filterByText,
          type: 'best_fields',
          fields: matchFields,
          fuzziness: 'AUTO',
        },
      },
    ]
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

  const result = await catalogue.query(dsl)
  return Object.entries(result.aggregations).map(([name, { buckets }]) => ({
    [name]: buckets,
  }))
}
