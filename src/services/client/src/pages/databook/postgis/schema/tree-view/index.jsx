import TreeItem from './tree-item'
import ContextMenu from './context-menu'
import useStyles from './style'
import { useState } from 'react'
import clsx from 'clsx'
import StorageIcon from '@material-ui/icons/Storage'
import OpenIcon from 'mdi-react/MenuDownIcon'
import ClosedIcon from 'mdi-react/MenuRightIcon'

const iconSizeSmall = 22

export default ({ schema }) => {
  const { tables } = schema
  const [expanded, setExpanded] = useState(false)
  const classes = useStyles()
  return (
    <>
      <div style={{ inlineSize: 'max-content', paddingLeft: 0 }}>
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
        <StorageIcon
          onClick={() => {
            setExpanded(!expanded)
          }}
          style={{ left: '-10px', padding: '0px', verticalAlign: 'middle' }}
          fontSize="small"
        />

        {/* Child Tree Items */}
        <div style={expanded ? {} : { visibility: 'hidden', height: '0' }}>
          {/* Mapping array of Tables */}
          {tables.map(table => {
            return (
              <TreeItem
                key={table.id}
                uniqueIdentifier={`${table.id}`}
                primaryText={table.id}
                itemDepth={1}
                tableId={table.id}
              >
                {/* Mapping array of Columns */}
                {table.fields.map(col => {
                  return (
                    <TreeItem
                      key={`${table.id}-${col.column_name}`}
                      uniqueIdentifier={`${table.id}-${col.column_name}`}
                      primaryText={col.column_name}
                      secondaryText={col.data_type}
                      itemDepth={2}
                      tableId={table.id}
                    />
                  )
                })}
              </TreeItem>
            )
          })}
        </div>
      </div>
    </>
  )
}
