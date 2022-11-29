import { client } from '../../../../elasticsearch/index.js'
import buildDsl from '../../../../elasticsearch/query-builder/dsl/index.js'
import { ELASTICSEARCH_CATALOGUE_INDEX } from '../../../../config/index.js'

export default async identifiers => {
  identifiers = identifiers.filter(_ => _)

  // NB! Otherwise all records get deleted
  if (!identifiers.length) {
    return null
  }

  return await client.deleteByQuery({
    index: ELASTICSEARCH_CATALOGUE_INDEX,
    refresh: true,
    ...buildDsl({ identifiers }),
  })
}
