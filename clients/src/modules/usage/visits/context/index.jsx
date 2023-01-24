import { createContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query (
        $type: LogType
        $bucket: DateBucket
        $sortByDate: SortConfig
        $sortByCount: SortConfig
      ) {
        downloadsCount: logs(type: $type) {
          count
        }

        downloadsByDate: logs(type: $type, sort: $sortByDate) {
          date(bucket: $bucket)
          count
        }

        ipLatLonCount: logs(type: $type, sort: $sortByCount) {
          createdAt
          clientIpLat
          clientIpLon
        }
      }
    `,
    {
      variables: {
        type: 'appRender',
        bucket: 'month',
        sortByCount: {
          dimension: 'count',
          direction: 'DESC',
        },
        sortByDate: {
          dimension: 'date',
          direction: 'ASC',
        },
      },
      fetchPolicy: 'no-cache',
    }
  )

  const {
    error: error2,
    loading: loading2,
    data: data2,
  } = useQuery(
    gql`
      query (
        $type: LogType
        $bucket: DateBucket
        $sortByCount: SortConfig
        $limit: Int
        $locationCountLimit: Int
        $doiCountLimit: Int
      ) {
        ipLocationCount: logs(type: $type, sort: $sortByCount, limit: $locationCountLimit) {
          clientIpLocation
          date(bucket: $bucket)
          count
        }

        doiCount: logs(type: $type, sort: $sortByCount, limit: $doiCountLimit) {
          doi
          date(bucket: $bucket)
          count
        }

        referrerCount: logs(type: $type, sort: $sortByCount, limit: $limit) {
          referrer
          date(bucket: $bucket)
          count
        }
      }
    `,
    {
      variables: {
        type: 'appRender',
        bucket: 'year',
        locationCountLimit: 25,
        doiCountLimit: 100,
        limit: 25,
        sortByCount: {
          dimension: 'count',
          direction: 'DESC',
        },
      },
      fetchPolicy: 'no-cache',
    }
  )

  if (loading || loading2) {
    return <Loading withHeight sx={{ position: 'relative' }} />
  }

  if (error || error2) {
    throw new Error(
      `Error retrieving download report data: ${error?.message.truncate(
        1000
      )} or ${error?.message.truncate(1000)}`
    )
  }

  const {
    downloadsCount: [downloadsCount],
    downloadsByDate,
    ipLatLonCount,
  } = data

  const { referrerCount, ipLocationCount, doiCount } = data2

  return (
    <context.Provider
      value={{
        downloadsCount,
        downloadsByDate,
        referrerCount,
        ipLocationCount,
        ipLatLonCount,
        doiCount,
      }}
    >
      {children}
    </context.Provider>
  )
}
