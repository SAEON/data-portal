import { createContext } from 'react'
import Loading from '../../../../components/loading'
import { gql, useQuery } from '@apollo/client'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query {
        usageReport
      }
    `,
    {
      variables: {},
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return <context.Provider value={{ ...data }}>{children}</context.Provider>
}
