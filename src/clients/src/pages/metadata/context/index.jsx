import { createContext, useState, useEffect } from 'react'
import Loading from '../../../components/loading'
import { gql, useQuery } from '@apollo/client'

export const context = createContext()

export default ({ children }) => {
  const [rows, setRows] = useState([])
  const [selectedRows, setSelectedRows] = useState(() => new Set())
  const [changes, setChanges] = useState({})
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
          title
        }

        institutions

        schemas
      }
    `
  )

  useEffect(() => {
    if (data?.indexedMetadata) {
      setRows(
        data?.indexedMetadata.map(
          (
            { id, doi, sid, institution, collection, schema, validated, errors, state, title },
            i
          ) => {
            return (
              changes[id] || {
                i: i + 1,
                id,
                doi,
                sid,
                institution,
                collection,
                schema,
                validated: '' + validated,
                errors: JSON.stringify(errors),
                state,
                metadata: undefined,
                title,
                edit: '',
              }
            )
          }
        )
      )
    }
  }, [changes, data])

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return (
    <context.Provider
      value={{
        institutions: data.institutions,
        schemas: data.schemas,
        selectedRows,
        setSelectedRows,
        rows,
        setRows,
        changes,
        setChanges,
      }}
    >
      {children}
    </context.Provider>
  )
}
