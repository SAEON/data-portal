import { useState, useContext } from 'react'
import { context as databooksContext } from '../../../context'
import StorageIcon from '@material-ui/icons/Storage'
import OpenIcon from 'mdi-react/MenuDownIcon'
import ClosedIcon from 'mdi-react/MenuRightIcon'
import clsx from 'clsx'
import useStyles from './style'
import { gql, useApolloClient } from '@apollo/client'
// import { FixedSizeList as List } from 'react-window'

const iconSizeSmall = 22
const iconSizeBig = iconSizeSmall //32

export default props => {
  const context = useContext(databooksContext)
  const { itemDepth, primaryText, secondaryText, children, tableId } = props

  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(primaryText)

  const indentation = itemDepth * 13

  const itemType = itemDepth === 0 ? 'schema' : itemDepth === 1 ? 'table' : 'column' // A Tree Item is either a Schema, Table, or Column. Columns are not expandble where as others are.
  const classes = useStyles()

  const client = useApolloClient()

  const onEnter = async () => {
    console.log('mutating!')
    setEditing(false)
    console.log('editing value', editing)
    //use mutation
    const result = await client.mutate({
      mutation: gql`
        mutation($schemaId: String!, $tableId: String!, $newTableName: String!) {
          browserClient {
            databook(id: "5fae7017811a701352474d93") {
              schema {
                tables(id: "testtable") {
                  updateTableName(name: "newname")
                }
              }
            }
          }
        }
      `,
      //   mutation($schemaId: String!, $tableId: String!, $newTableName: String!) {
      //     browserClient {
      //       databook(id: $schemaId) {
      //         schema {
      //           tables(id: $tableId) {
      //             updateTableName(name: $newTableName)
      //           }
      //         }
      //       }
      //     }
      //   }
      // `,
      variables: {
        SchemaId: context.databook.authentication.username,
        tableId: tableId,
        newTableName: text,
      },
    })
    console.log('result', result)
    if (result) {
      console.log('success!')
    } else {
      console.log('failed!')
      throw new Error('Error mutating!')
    }
    console.log('end of mutation')
  }

  //SCHEMA
  if (itemType === 'schema') {
    return (
      <div>
        {/* Expansion Icon */}
        {expanded ? (
          <OpenIcon
            size={iconSizeBig}
            className={clsx(classes.icon)}
            style={{ verticalAlign: 'middle' }}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        ) : (
          <ClosedIcon
            size={iconSizeBig}
            className={clsx(classes.icon)}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        )}

        {/* Child Tree Items */}
        <div style={expanded ? {} : { visibility: 'hidden', height: '0' }}>{children}</div>
      </div>
    )
  } //TABLE
  else if (itemType === 'table') {
    return (
      <div
        style={{ paddingLeft: indentation /*margin: '1px'*/ }}
        onDoubleClick={() => {
          setEditing(true)
        }}
        onBlur={onEnter}
      >
        {/* Expansion Icon */}
        {expanded ? (
          <OpenIcon
            size={iconSizeSmall}
            className={clsx(classes.icon)}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        ) : (
          <ClosedIcon
            size={iconSizeSmall}
            className={clsx(classes.icon)}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        )}
        {/* Text */}
        <span
          contentEditable={editing}
          className={clsx(classes.text)}
          onClick={() => setExpanded(!expanded)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onEnter(this, e)
            }
          }}
          onInput={e => {
            setText(e.target.innerHTML)
          }}
        >
          {primaryText}
        </span>
        {/* Child Tree Items */}
        <div style={expanded ? {} : { visibility: 'hidden', height: '0' }}>{children}</div>
      </div>
    )
  } //COLUMN
  else {
    return (
      <div
        style={{ paddingLeft: indentation /*margin: '1px'*/ }}
        onDoubleClick={() => {
          setEditing(true)
        }}
        onBlur={onEnter}
      >
        {/* Text */}
        <span
          contentEditable={editing}
          className={clsx(classes.text)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onEnter(this, e)
            }
          }}
          onInput={e => {
            setText(e.target.innerHTML)
          }}
        >
          {primaryText}
        </span>
        <span style={{ color: 'rgba(0, 0, 0, 0.4)' }}> {secondaryText}</span>
      </div>
    )
  }
}
