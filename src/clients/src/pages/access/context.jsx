import { createContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../components/loading'

export const context = createContext()

export default ({ children }) => {
  const { loading, error, data } = useQuery(gql`
    query {
      users {
        id
        emailAddress
        name
        roles {
          id
          name
          description
        }
      }

      roles {
        id
        name
        description
        permissions {
          id
          name
          description
        }
      }

      permissions {
        id
        name
        description
      }
    }
  `)

  if (loading) {
    return <Loading withHeight />
  }

  if (error) {
    throw error
  }

  const { users, roles, permissions } = data

  return <context.Provider value={{ users, roles, permissions }}>{children}</context.Provider>
}
