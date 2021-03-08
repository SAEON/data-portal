import { useQuery } from '@apollo/client'

export default (
  { children, QUERY, variables = {}, fetchPolicy = 'network-only' } = {},
  ...options
) => {
  const queryResult = useQuery(QUERY, { variables, fetchPolicy, ...options })
  return children(queryResult)
}
