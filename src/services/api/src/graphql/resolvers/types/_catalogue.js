export default {
  records: async (_, args, ctx) => {
    const { catalogue, catalogueStart } = ctx

    const { id, subjects, size = 100, before = undefined, after = undefined } = args
    if (size > 10000) {
      throw new Error('Maximum page size exceeded (10000)')
    }
    if (before && after) {
      throw new Error('Please specify either a "before" or an "after" cursor (not both)')
    }

    const result = {
      _type: 'CatalogueRecordConnection',
    }

    if (id) {
      const data = [await catalogue.getSingleRecord(id)]
      return Object.assign(result, {
        totalCount: data.length,
        resultCount: data.length,
        data,
        startCursor: undefined,
        endCursor: undefined,
      })
    }

    if (subjects && subjects.length) {
      const data = await catalogue.searchBySubjects(...subjects)
      return Object.assign(result, {
        totalCount: data.length,
        resultCount: data.length,
        data,
        startCursor: undefined,
        endCursor: undefined,
      })
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

    if (before || after) dsl.search_after = [before || after]

    const data = await catalogue.query(dsl)
    return {
      _size: size,
      _resultSize: data.hits.hits.length,
      _type: 'CatalogueRecordConnection',
      _firstResult: data.hits.hits[0],
      _lastResult: data.hits.hits[data.hits.hits.length - 1],
      _catalogueStart: catalogueStart,
      data: data.hits.hits,
      totalCount: data.hits.total,
    }
  },

  summary: async (_, args, ctx) => {
    const { catalogue } = ctx
    const { fields, filterBySubjects: subjects } = args
    const result = await catalogue.countPivotOn({ fields, subjects })
    return result
  },
}
