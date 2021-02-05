import gql from 'graphql-tag'
import { graphql, print } from 'graphql'

export default async (search, ctx) => {
  const { default: schema } = await import('../../../schema/index.js')

  const {
    extent = undefined,
    terms = undefined,
    text = undefined,
    size = 10000,
    ids = undefined,
    dois = undefined,
  } = search

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

  return records
}
