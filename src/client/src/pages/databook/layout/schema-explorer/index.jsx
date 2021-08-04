import { useContext, useState } from 'react'
import { context as schemaContext } from '../../contexts/schema-provider'
import StorageIcon from 'mdi-react/StorageIcon'
import ExpandIcon from 'mdi-react/ChevronRightIcon'
import { API_PUBLIC_ADDRESS } from '../../../../config'
import ContextMenu from './_context-menu'
import useStyles from './style'
import clsx from 'clsx'
import TableList from './table-list'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

export default () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(true)
  const { schema } = useContext(schemaContext)
  const { id: schemaId, tables } = schema

  return (
    <div className={clsx(classes.layout)}>
      <ul style={{ padding: 0 }} className={clsx(classes.ulReset)}>
        <li className={clsx(classes.liReset)}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ContextMenu
              uniqueIdentifier={'schema-icon'}
              style={{ float: 'left', display: 'flex' }}
              menuItems={[
                {
                  value: 'Export DB',
                  onClick: () => {
                    window.open(`${API_PUBLIC_ADDRESS}/pg-dump/${schemaId}`)
                  },
                  disabled: false,
                },
              ]}
            >
              <StorageIcon
                style={{ cursor: 'pointer', float: expanded ? 'unset' : 'left' }}
                onClick={() => setExpanded(!expanded)}
                size={22}
              />
            </ContextMenu>

            {/* EXPAND ICON */}
            {!expanded && (
              <ExpandIcon
                style={{ cursor: 'pointer' }}
                onClick={() => setExpanded(!expanded)}
                size={22}
              />
            )}

            {/* SCHEMA NAME */}
            {expanded && (
              <Tooltip title="This is the schema name">
                <Typography className={clsx(classes.monoText)}>{schemaId}</Typography>
              </Tooltip>
            )}
          </div>
          <div style={{ clear: 'both' }}></div>

          {/* LIST OF DATABASE OBJECTS */}
          <ul className={clsx(classes.ulReset)} style={{ display: expanded ? undefined : 'none' }}>
            <TableList tables={tables} />
          </ul>
        </li>
      </ul>
    </div>
  )
}
