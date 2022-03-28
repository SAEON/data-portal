import { useContext, createContext } from 'react'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../components/loading'
import { context as authenticationContext } from '../authentication'

export const context = createContext()

export default ({ children }) => {
  const { user: sessionUser } = useContext(authenticationContext)

  const { loading, data } = useQuery(
    gql`
      query user($id: ID!) {
        user(id: $id) {
          id
          emailAddress
          name
          permissions {
            id
            name
            description
          }
        }
      }
    `,
    {
      variables: {
        id: sessionUser?.id || 0
      }
    }
  )

  if (loading) {
    return <Loading />
  }

  const { user } = data || {}

  return (
    <context.Provider
      value={{
        user,
        isAuthenticated: Boolean(sessionUser),
        hasPermission: permission =>
          Boolean(user?.permissions.find(({ name }) => name === permission))
      }}
    >
      {children}
    </context.Provider>
  )
}
