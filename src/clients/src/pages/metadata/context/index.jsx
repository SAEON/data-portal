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
      }
    `
  )

  if (loading) {
    return <Loading style={{ top: 8 }} />
  }

  if (error) {
    throw error
  }

  return (
    <context.Provider value={{ data: data.indexedMetadata, selectedRows, setSelectedRows }}>
      {children}
    </context.Provider>
  )
}
