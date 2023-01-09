import { createContext, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../components/loading'

export const context = createContext()

export default ({ children }) => {
  const [filter, setFilter] = useState('')

  const { error, loading, data } = useQuery(
    gql`
      query lists($filter: String) {
        lists(filter: $filter) {
          id
          filter
          title
          description
          url
          createdBy
          type
        }
      }
    `,
    { variables: { filter }, fetchPolicy: 'cache-and-network' }
  )

  if (loading) {
    return <Loading withHeight />
  }

  if (error) {
    throw error
  }

  return (
    <context.Provider value={{ lists: data.lists, filter, setFilter }}>{children}</context.Provider>
  )
}
