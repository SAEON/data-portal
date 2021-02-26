import { useContext, useState } from 'react'
import StorageIcon from 'mdi-react/StorageIcon'
import ExpandIcon from 'mdi-react/ChevronRightIcon'
import { context as databookContext } from '../../context'
import { CATALOGUE_API_ADDRESS } from '../../../../config'
import useStyles from './style'
import clsx from 'clsx'
import ListOfTables from './_table-list'
import ContextMenu from './_context-menu'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

export default () => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(true)
  const { schema, databook } = useContext(databookContext)
  const { _id: schemaId } = databook.doc
  const { tables } = schema

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
                    window.open(`${CATALOGUE_API_ADDRESS}/pg-dump/${schemaId}`)
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
            <ListOfTables tables={tables} databook={databook.doc} />
          </ul>
        </li>
      </ul>
    </div>
  )
}
