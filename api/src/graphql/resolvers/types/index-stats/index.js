import { ELASTICSEARCH_CATALOGUE_INDEX } from '../../../../config/index.js'
import { client } from '../../../../elasticsearch/index.js'
import getCount from './_get-count.js'

export default {
  records: async (_, args, ctx) => {
    const result = await client.count({
      index: ELASTICSEARCH_CATALOGUE_INDEX,
      query: {
        match_all: {},
      },
    })

    return result.count
  },
  collections: async (_, args, ctx) => getCount({ ctx, id: 'count', field: 'collection.raw' }),
  institutions: async (_, args, ctx) => getCount({ ctx, id: 'count', field: 'institution.raw' }),
  providers: async (_, args, ctx) => getCount({ ctx, id: 'count', field: 'publisher.raw' }),
  themes: async (_, args, ctx) => getCount({ ctx, id: 'count', field: 'subjects.subject.raw' }),
}
