import { createContext } from 'react'
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
          createdBy
          type
        }
      }
    `,
    { variables: {} }
  )

  if (loading) {
    return <Loading withHeight />
  }

  if (error) {
    throw error
  }

  return <context.Provider value={{ lists: data.lists }}>{children}</context.Provider>
}
