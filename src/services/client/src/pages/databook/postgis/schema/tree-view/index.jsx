import TreeItem from './tree-item'
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
      <div>
        <StorageIcon
          onClick={() => {
            setExpanded(!expanded)
          }}
          fontSize="small"
        />
        {/* Expansion Icon */}
        {expanded ? (
          <OpenIcon
            size={iconSizeSmall}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        ) : (
          <ClosedIcon
            size={iconSizeSmall}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        )}

        {/* Child Tree Items */}
        <div style={{ marginLeft: '6px' }} className={expanded ? undefined : clsx(classes.hidden)}>
          {/* Mapping array of Tables */}
          {/* STEVEN TO DO: sort tables and sort columns */}
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
