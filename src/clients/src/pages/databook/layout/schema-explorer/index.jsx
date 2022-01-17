import { useContext, useState } from 'react'
import { context as schemaContext } from '../../contexts/schema-provider'
import StorageIcon from 'mdi-react/StorageIcon'
import ExpandIcon from 'mdi-react/ChevronRightIcon'
import { PUBLIC_HTTP_ADDRESS } from '../../../../config'
import ContextMenu from './_context-menu'
import TableList from './table-list'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

export default () => {
  const [expanded, setExpanded] = useState(true)
  const { schema } = useContext(schemaContext)
  const { id: schemaId, tables } = schema

  return (
    <div
      style={{
        padding: '4px 0 0 4px',
        height: '100%',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <ul style={{ padding: 0, margin: 'unset', paddingLeft: 15 }}>
        <li style={{ listStyleType: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ContextMenu
              uniqueIdentifier={'schema-icon'}
              style={{ float: 'left', display: 'flex' }}
              menuItems={[
                {
                  value: 'Export DB',
                  onClick: () => {
                    window.open(`${PUBLIC_HTTP_ADDRESS}/pg-dump/${schemaId}`)
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
                <Typography
                  sx={{
                    paddingLeft: '5px',
                    fontFamily: 'monospace',
                    fontSize: 'small',
                  }}
                >
                  {schemaId}
                </Typography>
              </Tooltip>
            )}
          </div>
          <div style={{ clear: 'both' }}></div>

          {/* LIST OF DATABASE OBJECTS */}
          <ul style={{ display: expanded ? undefined : 'none', margin: 'unset', paddingLeft: 15 }}>
            <TableList tables={tables} />
          </ul>
        </li>
      </ul>
    </div>
  )
}
