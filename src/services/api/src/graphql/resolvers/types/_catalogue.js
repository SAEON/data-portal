import fetch from 'node-fetch'
import { Catalogue } from '../../../../../../packages/catalogue-search/src/catalogue-search/index.js'
import { HTTP_PROXY } from '../../../config.js'

// TODO this should be a single instance for the lifecycle of the node.js app
const DSL_INDEX = `saeon-odp-4-2`
const DSL_PROXY = `${HTTP_PROXY}/proxy/saeon-elk`
const catalogue = new Catalogue({
  dslAddress: DSL_PROXY,
  index: DSL_INDEX,
  httpClient: fetch,
})

export default {
  // eslint-disable-next-line no-unused-vars
  records: async (self, args, ctx) => {
    const { id, subjects, first, last, after, before } = args

    const result = {
      _type: 'CatalogueRecordConnection',
      first,
      last,
      after,
      before,
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

    const data = await catalogue.query({
      size: 10000,
      from: 0,
      _source: {
        excludes: ['metadata_json.originalMetadata'],
        includes: ['metadata_json.*'],
      },
    })

    return Object.assign(result, {
      totalCount: data.hits.hits.length,
      resultCount: data.hits.hits.length,
      data: data.hits.hits.map(item => item._source),
      startCursor: undefined,
      endCursor: undefined,
    })
  },

  // eslint-disable-next-line no-unused-vars
  summary: async (self, args, ctx) => {
    const { fields, filterBySubjects: subjects } = args
    const result = await catalogue.countPivotOn({ fields, subjects })
    return result
  },
}
