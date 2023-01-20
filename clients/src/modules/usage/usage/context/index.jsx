import { createContext } from 'react'
import Loading from '../../../../components/loading'
import { gql, useQuery } from '@apollo/client'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query appRenders($type: LogType, $bucket: DateBucket, $sortByCount: SortConfig) {
        logs(type: $type, sort: $sortByCount) {
          clientSession
          referrer
          clientIpLocation
          date(bucket: $bucket)
        }
      }
    `,
    {
      variables: {
        bucket: 'day',
        sortByCount: {
          dimension: 'count',
          direction: 'DESC',
        },
      },
      fetchPolicy: 'no-cache',
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
