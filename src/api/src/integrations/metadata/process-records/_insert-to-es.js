import { ELASTICSEARCH_METADATA_INDEX } from '../../../config/index.js'
import { client } from '../../../elasticsearch/index.js'

export default async data =>
  await client.bulk({
    index: ELASTICSEARCH_METADATA_INDEX,
    refresh: true,
    body: data.map(doc => `{ "index": {"_id": "${doc.id}"} }\n${JSON.stringify(doc)}\n`).join(''),
  })
