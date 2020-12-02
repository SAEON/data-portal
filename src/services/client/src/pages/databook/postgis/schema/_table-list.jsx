import QuickForm from '@saeon/quick-form'
import ContextMenu from './_context-menu'
import { IconButton, Typography } from '@material-ui/core'
import ListOfFields from './_field-list'
import InfoIcon from 'mdi-react/InformationVariantIcon'
import TableIcon from 'mdi-react/TableIcon'
import clsx from 'clsx'
import useStyles from './style'

export default ({ tables }) => {
  const classes = useStyles()

  return tables.map(({ id: tableName, fields }) => {
    return (
      <li key={tableName} className={clsx(classes.liReset)}>
        <QuickForm editActive={false} hovered={false} expanded={false}>
          {(update, { editActive, hovered, expanded }) => {
            if (editActive) {
              return <input defaultValue="text" /> // TODO handle table mutation here
            } else
              return (
                <>
                  {editActive ? (
                    <input defaultValue="text" />
                  ) : (
                    <ContextMenu
                      uniqueIdentifier={tableName}
                      menuItems={[{ value: 'Rename', onClick: () => update({ editActive: true }) }]}
                    >
                      <span
                        onMouseEnter={() => update({ hovered: true })}
                        onMouseLeave={() => update({ hovered: false })}
                        style={{ display: 'flex', inlineSize: 'max-content' }}
                        className={clsx(classes.hoverHighlight)}
                      >
                        {/* Table Icon and text */}
                        <span
                          onClick={() => update({ expanded: !expanded })}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <TableIcon size={20} style={{ minWidth: 20, marginRight: '2px' }} />
                          <Typography className={clsx(classes.text)}>{tableName}</Typography>
                        </span>
                        {/* View Metadata (i) button */}
                        <span style={hovered ? {} : { visibility: 'hidden' }}>
                          <IconButton size={'small'}>
                            <InfoIcon />
                          </IconButton>
                        </span>
                      </span>
                    </ContextMenu>
                  )}
                  <ul
                    className={clsx(classes.ulReset)}
                    style={{ marginLeft: '5px', display: expanded ? undefined : 'none' }}
                  >
                    <ListOfFields tableName={tableName} fields={fields} />
                  </ul>
                </>
              )
          }}
        </QuickForm>
      </li>
    )
  })
}
