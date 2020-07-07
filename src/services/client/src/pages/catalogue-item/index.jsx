import { gql } from '@apollo/client'
import React from 'react'
import { GqlDataQuery } from '../../components'
import Layout from './_layout'

export default ({ id }) => (
  <GqlDataQuery
    query={gql`
      query catalogue($id: String) {
        catalogue {
          records(id: $id) {
            ... on CatalogueRecordConnection {
              nodes {
                ... on CatalogueRecord {
                  target
                }
              }
            }
          }
        }
      }
    `}
    variables={{ id }}
  >
    {({ catalogue }) => {
      const record = catalogue.records.nodes[0].target
      return <Page json={record} id={id} />
    }}
  </GqlDataQuery>
)

const Page = ({ json, id }) => {
  return <Layout json={json} id={id} />
}
