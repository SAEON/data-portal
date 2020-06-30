import { useQuery } from '@apollo/client'

export default ({ query, variables, fetchPolicy = 'network-only', children }) => {
  const { loading, error, data } = useQuery(query, { variables, fetchPolicy })

  if (loading) return 'Loading ...'

  if (error) return 'Error fetching GraphQL data'

  return children(data)
}
