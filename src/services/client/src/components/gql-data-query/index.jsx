import React from 'react'
import { useQuery } from '@apollo/client'
import { Typography } from '@material-ui/core'

export default ({ query, variables, fetchPolicy = 'network-only', children }) => {
  const { loading, error, data } = useQuery(query, { variables, fetchPolicy })

  if (loading) {
    return (
      <Typography variant="overline" style={{ margin: 10, padding: 10 }}>
        Loading...
      </Typography>
    )
  }

  if (error) return 'Error fetching GraphQL data'

  return children(data)
}
