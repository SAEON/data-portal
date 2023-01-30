import { createContext } from 'react'
import { PUBLIC_GQL_ADDRESS } from '../../../config'
import { gql, useQuery } from '@apollo/client'

export const context = createContext()

export default ({ children }) => {
  const { error, loading, data } = useQuery(
    gql`
      query {
        catalogue {
          indexStats {
            records
            collections
            providers
            themes
            institutions
          }
        }
      }
    `,
    {
      fetchPolicy: 'cache-first',
    }
  )

  if (error) {
    throw new Error(
      `${PUBLIC_GQL_ADDRESS}: ${error}\n\nIt is likely that Elasticsearch has not been configured`
    )
  }

  return <context.Provider value={{ loading, data }}>{children}</context.Provider>
}
