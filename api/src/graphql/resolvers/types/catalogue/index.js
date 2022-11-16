import search from '../../../../elasticsearch/query-builder/records.js'
import summary from '../../../../elasticsearch/query-builder/facets.js'

export default {
  search: async (_, args, ctx) => search({ args, ctx }),
  summary: async (_, args, ctx) => summary({ args, ctx }),
}
