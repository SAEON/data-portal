import { createContext, useState } from 'react'
import Loading from '../../../components/loading'
import { gql, useQuery } from '@apollo/client'

export const context = createContext()

export default ({ children }) => {
  const [selectedRows, setSelectedRows] = useState(() => new Set())
  const { error, loading, data } = useQuery(
    gql`
      query {
        indexedMetadata {
          id
          doi
          sid
          institution
          collection
          schema
          validated
          errors
          state
          metadata
        }

        institutions

        schemas
      }
    `
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  const { indexedMetadata, institutions, schemas } = data

  return (
    <context.Provider
      value={{
        indexedMetadata,
        institutions,
        schemas,
        selectedRows,
        setSelectedRows,
      }}
    >
      {children}
    </context.Provider>
  )
}
