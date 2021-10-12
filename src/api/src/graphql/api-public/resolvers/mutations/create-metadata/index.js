import { ObjectId } from 'mongodb'
import fetch from 'node-fetch'
import { ODP_API } from '../../../../../config/index.js'
import { v4 as UUIDv4 } from 'uuid'
import processRecordsIntoElasticsearch from '../../../../../integrations/metadata/process-records/index.js'

export default async (self, { input, numberOfRecords = 1, institution }, ctx) => {
  const { id: currentUserId } = ctx.user.info(ctx)
  const { findUsers } = ctx.mongo.dataFinders
  const user = (await findUsers({ _id: ObjectId(currentUserId) }))[0]
  const { token_type, access_token } = user.tokenSet

  const result = await Promise.all(
    [...Array(numberOfRecords)].map(
      () =>
        new Promise((resolve, reject) =>
          fetch(`${ODP_API}/${institution}/metadata/`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              accept: 'application/json',
              authorization: [token_type, access_token].join(' '),
            },
            body: JSON.stringify({
              sid: UUIDv4(),
              ...input,
            }),
          })
            .then(res => res.json())
            .then(json => {
              if (json.detail) {
                throw new Error(`ERROR creating metadata records: ${json.detail}`)
              } else {
                return resolve(json)
              }
            })
            .catch(error => reject(error))
        )
    )
  )

  const esResponse = await processRecordsIntoElasticsearch(result, null, 2)
  const ids = esResponse.body.items.map(({ index: { _id } }) => _id)
  const { query } = ctx.elastic

  // TODO - get the ids back

  return result
}
