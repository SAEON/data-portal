import { gql } from '@apollo/client'
import React from 'react'
import { GqlDataQuery } from '../../components'

/**
 * The entry point to the page
 * This will fetch the record
 * specified in the URL
 */
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
      return <Page json={record} />
    }}
  </GqlDataQuery>
)

/**
 * Then format the JSON
 * to look nice
 */
const Page = ({ json }) => {
  return JSON.stringify(json)
}
