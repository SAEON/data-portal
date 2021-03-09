import { createContext, useContext } from 'react'
import { context as databookContext } from '../databook-provider'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../components/loading'

export const context = createContext()

export default ({ children }) => {
  const { databook } = useContext(databookContext)
  const databookId = databook._id

  const { error, loading, data } = useQuery(
    gql`
      query($databookId: ID!) {
        dashboards(databookId: $databookId) {
          id
          title
          subtitle
          description
          layout
          filters
        }
      }
    `,
    {
      variables: {
        databookId,
      },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return <context.Provider value={{ dashboards: data.dashboards }}>{children}</context.Provider>
}
