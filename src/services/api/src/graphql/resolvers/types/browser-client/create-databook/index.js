import mongodb from 'mongodb'
const { ObjectID } = mongodb
import hash from 'object-hash'
import gql from 'graphql-tag'
import { graphql, print } from 'graphql'
import createPostgisWorkspace from './create-workspace/postgis/index.js'
import getTableName from './_get-table-name.js'

export default async (self, args, ctx) => {
  const { state, createdBy } = args
  const { Databooks } = await ctx.mongo.collections
  const { default: schema } = await import('../../../../schema/index.js')

  const {
    extent = undefined,
    terms = undefined,
    text = undefined,
    size = 10,
    ids = undefined,
    dois = undefined,
  } = state

  /**
   * Search the catalogue with the provided state
   * for a list of record IDs that should be included
   * in the databook
   */
  const records = (
    await graphql(
      schema,
      print(gql`
        query(
          $extent: WKT_4326
          $text: String
          $terms: [TermInput!]
          $size: Int
          $ids: [ID!]
          $dois: [String!]
        ) {
          catalogue {
            id
            records(
              extent: $extent
              text: $text
              terms: $terms
              size: $size
              ids: $ids
              dois: $dois
            ) {
              nodes {
                metadata
              }
            }
          }
        }
      `),
      null,
      ctx,
      { extent, terms, text, size, ids, dois }
    )
  ).data.catalogue.records.nodes.map(({ metadata: m }) => m)

  /**
   * Insert a databook, with the ready status of
   * each table as 'false'
   */
  const recordsIds = records.map(({ _source: _ }) => _.id)
  const { insertedId: databookId } = await Databooks.insertOne({
    _id: ObjectID(),
    hash: hash(recordsIds),
    tables: Object.fromEntries(recordsIds.map(id => [[getTableName(id)], { ready: false }])),
    createdBy,
    modifiedAt: new Date(),
  })

  /**
   * Create backing-postgis db for this databook
   * This is a fire and forget method
   */
  process.nextTick(() =>
    createPostgisWorkspace({ records, databookId }).catch(error => console.error(error))
  )

  /**
   * Clients can check the status of the
   * workspace by querying the Mongo document
   * that has just been inserted
   */
  return databookId
}
