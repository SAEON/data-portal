import { gql } from '@apollo/client'
import React from 'react'
import { GqlDataQuery } from '../../components'
import Layout from './_layout'

export default ({ id }) => (
  <GqlDataQuery
    query={gql`
      query catalogue($id: String) {
        catalogue(id: $id)
      }
    `}
    variables={{ id }}
  >
    {({ catalogue }) => {
      const record = catalogue[0]
      return <Page json={record} id={id} />
    }}
  </GqlDataQuery>
)

const Page = ({ json, id }) => {
  return <Layout json={json} id={id} />
}
