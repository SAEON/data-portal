import { createContext, useMemo } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../components/loading'
export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query {
        lists {
          id
          search
          title
          description
          url
          referrer
          createdBy
          disableSidebar
          showSearchBar
        }
      }
    `,
    { variables: {} }
  )

  const lists = useMemo(() => data?.lists || [], [data])

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return <context.Provider value={{ lists }}>{children}</context.Provider>
}
