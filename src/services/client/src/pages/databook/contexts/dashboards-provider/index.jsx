import { createContext, useContext } from 'react'
import { context as databookContext } from '../databook-provider'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'

export const context = createContext()

export default ({ children }) => {
  const { id } = useContext(databookContext)

  const { error, loading, data } = useQuery(
    gql`
      query databook($id: ID!) {
        databook(id: $id) {
          id
          dashboards {
            id
            title
            subtitle
            description
            layout
            filters
          }
        }
      }
    `,
    {
      variables: { id },
      fetchPolicy: 'cache-first',
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return <context.Provider value={data.databook.dashboards}>{children}</context.Provider>
}
