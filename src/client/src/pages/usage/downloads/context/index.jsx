import { createContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'
import UAParser from 'ua-parser-js'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query ($bucket: DateBucket) {
        downloadCount: downloadsReport {
          count
        }

        referrerCount: downloadsReport {
          referrer
          date(bucket: $bucket)
          count
        }

        deviceCount: downloadsReport {
          clientUserAgent
          count
        }

        ipLocationCount: downloadsReport {
          clientIpAddress
          clientIpLocation
          count
        }
      }
    `,
    {
      variables: {
        bucket: 'day',
      },
      fetchPolicy: 'no-cache',
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw new Error(`Error retrieving download report data: ${error.message.truncate(1000)}`)
  }

  const {
    downloadCount: [downloadCount],
    referrerCount,
    deviceCount,
    ipLocationCount,
  } = data

  return (
    <context.Provider
      value={{
        downloadCount,
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
