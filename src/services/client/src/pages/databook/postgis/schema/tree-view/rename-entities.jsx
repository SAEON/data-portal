import { gql, useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'

const RENAME_TABLE = gql`
  query($id: ID!, $tableName: ID!, $newName: String!) {
    databook(id: $id) {
      schema {
        tables(id: $tableName) {
          updateTableName(name: $newName)
        }
      }
    }
  }
`
const RENAME_COLUMN = gql`
  query($id: ID!, $tableName: ID!, $columnName: ID!, $newName: String!) {
    databook(id: $id) {
      schema {
        tables(id: $tableName) {
          fields(id: $columnName) {
            updateFieldName(name: $newName)
          }
        }
      }
    }
  }
`
const RenameEntity = props => {
  const { query, variables, children } = props
  const [renameEntityLazy, result] = useLazyQuery(query, {
    variables,
    fetchPolicy: 'network-only',
  })
  const { called, loading, error } = result

  if (loading) console.log('Renaming Entity..')
  else if (called && !loading) {
    console.log('Rename Entity result', result)
  }
  if (error) {
    console.log('mutation error!', error)
  }
  //STEVEN TO DO: ERROR HANDLING!
  return children(renameEntityLazy)
}

const RenameTable = ({ variables, children, inputRef }) => {
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  return (
    <RenameEntity query={RENAME_TABLE} variables={variables}>
      {children}
    </RenameEntity>
  )
}

const RenameColumn = ({ variables, children }) => {
  return (
    <RenameEntity query={RENAME_COLUMN} variables={variables}>
      {children}
    </RenameEntity>
  )
}

export { RenameTable, RenameColumn }
