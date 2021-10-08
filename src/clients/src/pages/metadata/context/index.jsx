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
      }
    `
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return (
    <context.Provider
      value={{
        indexedMetadata: data.indexedMetadata,
        institutions: data.institutions,
        selectedRows,
        setSelectedRows,
      }}
    >
      {children}
    </context.Provider>
  )
}
