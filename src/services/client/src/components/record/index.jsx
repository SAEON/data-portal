import React from 'react'
import { gql } from '@apollo/client'
import { Loading } from '../../components'
import { WithQglQuery } from '../../hooks'
import Layout from './layout'

export default ({ id }) => (
  <WithQglQuery
    QUERY={gql`
      query catalogue($ids: [ID!]) {
        catalogue {
          records(ids: $ids) {
            nodes {
              target
            }
          }
        }
      }
    `}
    variables={{ ids: [id] }}
  >
    {({ loading, error, data }) => {
      if (error) {
        throw new Error(`Error retrieving record ${id}. ${error}`)
      }

      return loading ? (
        <Loading />
      ) : (
        <Layout id={id} json={data?.catalogue?.records?.nodes?.[0]?.target?._source} />
      )
    }}
  </WithQglQuery>
)
