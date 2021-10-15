import { createContext, useState, useCallback, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import Loading from '../../../../components/loading'

export const context = createContext()

export default ({ children, row, onRowChange, column: { key } }) => {
  const [view, setView] = useState('form')
  const [loadMetadata, { error, loading }] = useLazyQuery(
    gql`
      query ($ids: [ID!]) {
        indexedMetadata(ids: $ids) {
          id
          metadata
        }
      }
    `,
    {
      onCompleted: data => {
        onRowChange({
          ...row,
          metadata: { ...data.indexedMetadata[0].metadata, ...(row.metadata || {}) },
        })
      },
      fetchPolicy: 'cache-and-network',
      variables: {
        ids: [row.id],
      },
    }
  )

  const updateMetadata = useCallback(
    json => onRowChange({ ...row, metadata: JSON.parse(json) }),
    [onRowChange, row]
  )

  useEffect(() => {
    if (!row?.metadata) {
      loadMetadata()
    }
  }, [loadMetadata, row?.metadata])

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return (
    <context.Provider value={{ json: row[key], setView, view, updateMetadata }}>
      {children}
    </context.Provider>
  )
}
