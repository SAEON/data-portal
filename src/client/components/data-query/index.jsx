import { useQuery } from '@apollo/react-hooks'

export default ({ query, variables, children, loadingComponent = null }) => {
  const { loading, error, data } = useQuery(query, { variables })

  if (loading) return loadingComponent ? loadingComponent : 'Loading ...'

  if (error) return 'Error fetching data'

  return children(data)
}
