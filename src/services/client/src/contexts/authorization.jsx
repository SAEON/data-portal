import { useContext, createContext } from 'react'
import WithGqlQuery from '../hooks/with-gql-query'
import Loading from '../components/loading'
import { gql } from '@apollo/client'
import { context as authenticationContext } from './authentication'

export const context = createContext()

export default ({ children }) => {
  const { userInfo } = useContext(authenticationContext)
  const userRoles = userInfo?.userRoles

  return (
    <WithGqlQuery
      QUERY={gql`
        query {
          userRoles {
            id
            name
            description
          }
        }
      `}
    >
      {({ loading, data }) => {
        if (loading) {
          return <Loading />
        }

        const applicationRoles = data?.userRoles
        const dataScientistRoleId =
          applicationRoles && applicationRoles.find(({ name }) => name === 'datascientist').id
        const adminRoleId =
          applicationRoles && applicationRoles.find(({ name }) => name === 'admin').id

        return (
          <context.Provider
            value={{
              applicationRoles,
              isAuthenticated: Boolean(userInfo),
              isDataScientist: dataScientistRoleId && userRoles?.includes(dataScientistRoleId),
              isAdmin: adminRoleId && userRoles?.includes(adminRoleId),
              isAuthorized: roles => {
                if (!applicationRoles) return false
                const roleId = applicationRoles.find(({ name }) => roles.includes(name)).id
                return userRoles?.includes(roleId)
              },
            }}
          >
            {children}
          </context.Provider>
        )
      }}
    </WithGqlQuery>
  )
}
