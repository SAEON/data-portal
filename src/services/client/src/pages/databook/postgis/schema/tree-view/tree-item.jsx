import { useState, useContext } from 'react'
import { context as databooksContext } from '../../../../../contexts/databooks'
import StorageIcon from '@material-ui/icons/Storage'
import OpenIcon from 'mdi-react/MenuDownIcon'
import ClosedIcon from 'mdi-react/MenuRightIcon'
import clsx from 'clsx'
import useStyles from './style'
import { IconButton } from '@material-ui/core'
import { gql, useMutation } from '@apollo/client'
// import { FixedSizeList as List } from 'react-window'

const ICON_SIZE = 22

export default props => {
  const { itemDepth, primaryText, secondaryText, children } = props
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const indentation = itemDepth * 13
  const classes = useStyles()
  const itemType = itemDepth === 0 ? 'schema' : itemDepth === 1 ? 'table' : 'column' // A Tree Item is either a Schema, Table, or Column. Columns are not expandble where as others are.

  const contextTest = useContext(databooksContext)
  console.log('contextTest', contextTest)
  const onEnter = e => {
    setEditing(false)
    //use mutation?
  }

  //SCHEMA
  if (itemType === 'schema') {
    return (
      <div style={{ paddingLeft: indentation, margin: '1px' }}>
        {/* Expansion Icon */}
        <IconButton
          onClick={() => {
            setExpanded(!expanded)
          }}
          style={expanded ? { backgroundColor: 'rgba(0,0,0,0.15)' } : undefined}
        >
          <StorageIcon />
        </IconButton>

        {/* Child Tree Items */}
        <div style={expanded ? {} : { visibility: 'hidden', height: '0' }}>{children}</div>
      </div>
    )
  } //TABLE
  else if (itemType === 'table') {
    return (
      <div
        style={{ paddingLeft: indentation, margin: '1px' }}
        onDoubleClick={() => {
          setEditing(true)
        }}
        onBlur={() => {
          setEditing(false)
        }}
      >
        {/* Expansion Icon */}
        {expanded ? (
          <OpenIcon
            size={ICON_SIZE}
            className={clsx(classes.icon)}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        ) : (
          <ClosedIcon
            size={ICON_SIZE}
            className={clsx(classes.icon)}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        )}
        {/* Text */}
        <span
          contentEditable={itemType === 'schema' ? false : editing}
          className={clsx(classes.text)}
          onKeyDown={e => {
            if (e.key === 'Enter' && itemType !== 'schema') {
              onEnter(this, e)
            }
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
        style={{ paddingLeft: indentation, margin: '1px' }}
        onDoubleClick={() => {
          setEditing(true)
        }}
        onBlur={() => {
          onEnter()
        }}
      >
        {/* Text */}
        <span
          contentEditable={itemType === 'schema' ? false : editing}
          className={clsx(classes.text)}
          onKeyDown={e => {
            if (e.key === 'Enter' && itemType !== 'schema') {
              onEnter(this, e)
            }
          }}
        >
          {primaryText}
        </span>
        <span style={{ color: 'rgba(0, 0, 0, 0.4)' }}> {secondaryText}</span>
      </div>
    )
  }
}

//not sure how best to execute such a query (below query is sample update table query)
// const runQuery = <WithGqlQuery
//   QUERY={gql`
//     query($schemaId: String!, $tableId: String!, $newTableName: String!) {
//       {
//         browserClient
//         {
//           databook(id:$schemaId)
//           {
//             schema
//             {
//               tables(id:$tableId)
//               {
//                 updateTableName(name:$newTableName)
//               }
//             }
//           }
//         }
//       }
//     }
//   `}
//   variables={{
//     schemaId: schemaId,
//     tableId: tableId,
//     newTableName: newTableName,
//   }}
// >
// </WithGqlQuery>
