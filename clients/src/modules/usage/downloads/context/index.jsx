import { createContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'
import UAParser from 'ua-parser-js'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query downloads(
        $type: LogType
        $bucket: DateBucket
        $sortByDate: SortConfig
        $sortByCount: SortConfig
      ) {
        downloadsCount: logs(type: $type) {
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

        deviceCount: logs(type: $type, sort: $sortByCount) {
          clientUserAgent
          count
        }

        ipLocationCount: logs(type: $type, sort: $sortByCount) {
          clientIpLocation
          count
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
        sortByDate: {
          dimension: 'date',
          direction: 'DESC',
        },
      },
      fetchPolicy: 'no-cache',
    }
  )

  if (loading) {
    return <Loading withHeight sx={{ position: 'relative' }} />
  }

  if (error) {
    throw new Error(`Error retrieving download report data: ${error.message.truncate(1000)}`)
  }

  const {
    downloadsCount: [downloadsCount],
    downloadsByDate,
    referrerCount,
    deviceCount,
    ipLocationCount,
  } = data

  return (
    <context.Provider
      value={{
        downloadsCount,
        downloadsByDate,
        referrerCount,
        ipLocationCount,
        deviceCount: Object.entries(
          deviceCount
            .map(({ clientUserAgent, ...other }) => {
              const ua = new UAParser(clientUserAgent)
              const { name: osName } = ua.getOS()
              const { name } = ua.getBrowser()

              return {
                device: `${name} (${osName})`,
                ...other,
              }
            })
            .reduce(
              (devices, { device, count, ...other }) =>
                Object.assign(devices, {
                  [device]: {
                    count: count + (devices[device]?.count || 0),
                    device,
                    ...other,
                  },
                }),
              {}
            )
        ).map(([, fields]) => fields),
      }}
    >
      {children}
    </context.Provider>
  )
}
