import { createContext } from 'react'
import Loading from '../../../../components/loading'
import { gql, useQuery } from '@apollo/client'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query appRenders(
        $type: LogType
        $sort: SortConfig
        $bucket: DateBucket
        $sortByDate: SortConfig
        $sortByCount: SortConfig
      ) {
        deviceCount: logs(type: $type, sort: $sortByCount) {
          clientUserAgent
          count
        }

        referrerCount: logs(type: $type, sort: $sortByCount) {
          referrer
          count
        }

        downloadsByDate: logs(type: $type, sort: $sortByDate) {
          date(bucket: $bucket)
          count
        }

        ipLocationCount: logs(type: $type, sort: $sortByCount) {
          clientIpLocation
          count
        }

        ipLatLonCount: logs(type: $type, sort: $sort) {
          createdAt
          clientIpLat
          clientIpLon
        }
      }
    `,
    {
      variables: {
        type: 'appRender',
        sort: {
          dimension: 'createdAt',
          direction: 'DESC',
        },
        sortByDate: {
          dimension: 'date',
          direction: 'DESC',
        },
        sortByCount: {
          dimension: 'count',
          direction: 'DESC',
        },
        bucket: 'day',
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

  const { ipLatLonCount, ipLocationCount, downloadsByDate, deviceCount, referrerCount } = data

  return (
    <context.Provider
      value={{ ipLatLonCount, downloadsByDate, deviceCount, referrerCount, ipLocationCount }}
    >
      {children}
    </context.Provider>
  )
}
