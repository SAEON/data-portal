import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Typography } from '@material-ui/core'
import { Loading } from '../../components'
import Layout from './layout'

export default ({ id }) => {
  const { loading, error, data } = useQuery(
    gql`
      query catalogue($id: ID) {
        catalogue {
          records(id: $id) {
            nodes {
              target
            }
          }
        }
      }
    `,
    {
      variables: { id },
    }
  )

  const record = data?.catalogue?.records?.nodes?.[0]?.target?._source
  return error ? (
    <Typography variant="overline" style={{ margin: 10, padding: 10 }}>
      {error.message}
    </Typography>
  ) : loading ? (
    <Loading />
  ) : (
    <Layout json={record} id={id} />
  )
}
