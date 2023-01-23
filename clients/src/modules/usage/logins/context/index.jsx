import { createContext } from 'react'
import Loading from '../../../../components/loading'
import { gql, useQuery } from '@apollo/client'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query ($type: LogType, $limit: Int) {
        logs(type: $type, limit: $limit) {
          createdAt
          clientIpLocation
          clientIpAddress
          clientIpLat
          clientIpLon
          userId
        }
      }
    `,
    {
      fetchPolicy: 'network-only',
      variables: {
        type: 'authentication',
        limit: 1000,
      },
    }
  )

  if (loading) {
    return <Loading sx={{ position: 'relative' }} />
  }

  if (error) {
    throw error
  }

  return <context.Provider value={{ data: data.logs }}>{children}</context.Provider>
}
