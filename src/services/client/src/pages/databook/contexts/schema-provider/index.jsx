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
          schema {
            id
            tables {
              id
              table_schema
              odpRecordId
              description
              fields {
                id
                column_name
                data_type
                ordinal_position
              }
            }
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

  console.log('rendering')

  return (
    <context.Provider value={{ schema: data.databook.schema, refreshSchema: () => alert('todo') }}>
      {children}
    </context.Provider>
  )
}
