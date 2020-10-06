import { useQuery } from '@apollo/client'

export default ({ children, QUERY, variables = {} } = {}) => {
  const queryResult = useQuery(QUERY, { variables })
  return children(queryResult)
}
