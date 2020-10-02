import wkt from 'wkt'
const { parse } = wkt
import matchFields from './_match-fields.js'

export default async (_, args, ctx) => {
  const { catalogue } = ctx
  const {
    fields,
    filterByText = undefined,
    filterByExtent = undefined,
    filterByIds: ids = undefined,
    filterByDois: dois = undefined,
    filterByTerms: terms = undefined,
    limit: size,
    textSort = undefined,
  } = args

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

  if (
    filterByExtent ||
    terms?.length ||
    filterByText ||
    textSort ||
    (ids && ids.length) ||
    (dois && dois.length)
  ) {
    dsl.query = {
      bool: {
        must: [],
      },
    }
  }

  if (ids && ids.length) {
    dsl.query.bool.must = [
      {
        terms: {
          'id.raw': ids,
        },
      },
    ]
  } else if (dois && dois.length) {
    dsl.query.bool.must = [
      {
        terms: {
          'identifier.identifier.raw': dois,
        },
      },
    ]
  } else {
    if (filterByText) {
      dsl.query.bool.must = [
        ...dsl.query.bool.must,
        {
          multi_match: {
            query: filterByText.toLowerCase(),
            fields: matchFields,
            type: 'best_fields',
            fuzziness: 'AUTO',
          },
        },
      ]
    }

    if (filterByExtent) {
      // Our metadata shapes are specified in YX, rather than XY. So this translation is needed
      const shape = parse(filterByExtent)

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
        ...terms
          .filter(({ field, value }) =>
            field === 'publicationYear' ? Boolean(parseInt(value), 10) : true
          )
          .map(({ field, value }) => ({ term: { [field]: value } })),
      ]
    }
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

  const result = await catalogue.query(dsl)
  return Object.entries(result.aggregations).map(([name, { buckets }]) => ({
    [name]: buckets,
  }))
}
