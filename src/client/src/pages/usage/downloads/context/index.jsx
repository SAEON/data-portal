import { createContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query downloadsReport($dateBucket: DateBucket) {
        downloadsReport {
          id
          clientIpAddress
          clientUserAgent
          referrer
          date(bucket: $dateBucket)
          count
        }
      }
    `,
    {
      variables: {
        dateBucket: 'minute',
      },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw new Error('Error retrieving download report data', error.message)
  }

  const { downloadsReport: downloads } = data

  return <context.Provider value={{ downloads }}>{children}</context.Provider>
}
