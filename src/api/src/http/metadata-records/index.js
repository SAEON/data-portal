import { execute } from 'graphql'
import { ObjectId } from 'mongodb'
import { ODP_API_CATALOGUE_ENDPOINT } from '../../config/index.js'
import authenticateWithOdp from '../../lib/authenticate-with-odp.js'
import fetch from 'node-fetch'
import { gql } from 'apollo-server-koa'

/**
 * TODO
 *
 * This will fail when there are more than 10 000
 * Elasticsearch results. To fix, make multiple
 * trips to Elasticsearch to append to the client
 * stream.
 *
 * This shouldn't be that complicated since the
 * catalogue records endpoint already supports
 * pagination
 */
export default async ctx => {
  const { findLists } = ctx.mongo.dataFinders
  const { search } = ctx.query
  const { publicSchema } = ctx.gql

  if (!search) {
    ctx.throw(400, 'No search ID provided. Unable to download records')
  }

  try {
    // Set appropriate response headers
    ctx.set('Content-disposition', `attachment; filename=odp-${new Date().toISOString()}.json`)
    ctx.set('Content-Type', 'application/force-download')

    // Load the saved search state
    const { search: list } = (await findLists({ _id: ObjectId(search) }))[0]

    // Query the catalogue for the IDs associated with this search state
    const { data } = await execute(
      publicSchema,
      gql`
        query (
          $ids: [ID!]
          $dois: [String!]
          $text: String
          $terms: [TermInput!]
          $extent: WKT_4326
          $size: Int
        ) {
          catalogue {
            records(
              ids: $ids
              dois: $dois
              text: $text
              terms: $terms
              extent: $extent
              size: $size
            ) {
              nodes {
                id
              }
            }
          }
        }
      `,
      null,
      ctx,
      Object.assign({ size: 10000 }, list)
    )

    // Authenticate with the ODP
    const { token_type, access_token } = await authenticateWithOdp()

    // Stream the ODP response to the client
    ctx.body = await fetch(`${ODP_API_CATALOGUE_ENDPOINT}/?limit=10000`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: [token_type, access_token].join(' '),
      },
      body: JSON.stringify(data.catalogue.records.nodes.map(({ id }) => id)),
    }).then(res => res.body)
  } catch (error) {
    console.error('Error searching metadata catalogue', error)
    ctx.throw(400, `Error searching metadata catalogue. ${error.message}`)
  }
}
