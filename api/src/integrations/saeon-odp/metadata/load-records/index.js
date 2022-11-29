import { client } from '../../../../elasticsearch/index.js'
import { ELASTICSEARCH_CATALOGUE_INDEX } from '../../../../config/index.js'
import filter from './_filter.js'

export default async data =>
  client.bulk({
    index: ELASTICSEARCH_CATALOGUE_INDEX,
    refresh: true,
    operations: (await filter(data))
      .map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`)
      .join(''),
  })
