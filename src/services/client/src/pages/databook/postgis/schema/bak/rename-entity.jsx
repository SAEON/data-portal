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
const QueryOperator = props => {
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
    console.error(error)
  }
  //STEVEN TO DO: more error handling
  return children(renameEntityLazy)
}

const RenameEntity = ({ variables, children, inputRef, entityType }) => {
  if (!['table', 'column'].includes(entityType)) {
    console.log('RenameEntity requires a valid entityType')
    return children
  }

  // useEffect(() => {
  //   inputRef.current.focus()
  // }, [])

  return (
    <QueryOperator
      query={entityType === 'table' ? RENAME_TABLE : RENAME_COLUMN}
      variables={variables}
    >
      {children}
    </QueryOperator>
  )
}

export default RenameEntity
