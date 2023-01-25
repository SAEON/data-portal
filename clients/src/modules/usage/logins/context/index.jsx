import { createContext } from 'react'
import Loading from '../../../../components/loading'
import { gql, useQuery } from '@apollo/client'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query ($type: LogType, $limit: Int, $sort: SortConfig) {
        logs(type: $type, limit: $limit, sort: $sort) {
          createdAt
          userId
          userName
        }
      }
    `,
    {
      fetchPolicy: 'network-only',
      variables: {
        sort: {
          dimension: 'createdAt',
          direction: 'DESC',
        },
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
