import { useQuery } from '@apollo/client'

export default ({ children, QUERY, variables = {}, fetchPolicy = 'network-only' } = {}) => {
  const queryResult = useQuery(QUERY, { variables, fetchPolicy })
  return children(queryResult)
}
