import { createContext, useState } from 'react'
import Loading from '../../../components/loading'
import { gql, useQuery } from '@apollo/client'

export const context = createContext()

/**
 * (1) On initial load, the table is built
 * from the query results
 *
 * (2) Every time the Apollo cache is updated
 * this component should re-render, providing
 * and updated 'indexedMetadata' object
 */

export default ({ children }) => {
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

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return (
    <RowHandler
      institutions={data.institutions}
      schemas={data.schemas}
      indexedMetadata={data.indexedMetadata}
    >
      {children}
    </RowHandler>
  )
}

/**
 * (1) There is an object that contains a list
 * of changes. Updating table values actually
 * involves updating this list of changes
 *
 * (2) Whenever the changes list is updated
 * the rows are rebuilt, applying changes on
 * top of the query result
 */

const RowHandler = ({ children, indexedMetadata, institutions, schemas }) => {
  const [changes, setChanges] = useState({})
  const [selectedRows, setSelectedRows] = useState(() => new Set())

  const [rows, setRows] = useState(
    indexedMetadata.map(
      (
        {
          id,
          doi,
          sid,
          institution,
          collection,
          schema,
          metadata = {},
          validated,
          errors,
          state,
          title,
        },
        i
      ) => {
        const { metadata: changedMetadata = {}, ...otherChanges } = changes[id] || {}
        return {
          i: i + 1,
          id,
          doi,
          sid,
          institution,
          collection,
          schema,
          validated: '' + validated,
          errors,
          state,
          metadata: { ...metadata, ...changedMetadata },
          title,
          edit: '',
          ...otherChanges,
        }
      }
    )
  )

  return (
    <context.Provider
      value={{
        institutions,
        schemas,
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
