import { useState } from 'react'
import QuickForm from '@saeon/quick-form'
import ContextMenu from './_context-menu'
import { IconButton, Typography } from '@material-ui/core'
import ListOfFields from './_field-list'
import InfoIcon from 'mdi-react/InformationVariantIcon'

export default ({ tables }) => {
  const [expanded, setExpanded] = useState(false)

  return tables.map(({ id: tableName, fields }) => {
    return (
      <li key={tableName}>
        <QuickForm editActive={false} hovered={false}>
          {(update, { editActive, hovered }) => {
            if (editActive) {
              return <input /> // TODO handle table mutation here
            }

            return (
              <ContextMenu
                uniqueIdentifier={tableName}
                menuItems={[{ value: 'Rename', onClick: () => update({ editActive: true }) }]}
              >
                <span
                  onMouseEnter={() => update({ hovered: true })}
                  onMouseLeave={() => update({ hovered: false })}
                >
                  <div style={{ display: 'flex' }}>
                    <Typography onClick={() => setExpanded(!expanded)}>{tableName}</Typography>
                    <span style={hovered ? {} : { visibility: 'hidden' }}>
                      <IconButton size={'small'}>
                        <InfoIcon />
                      </IconButton>
                    </span>
                  </div>
                </span>
              </ContextMenu>
            )
          }}
        </QuickForm>
        <ul style={expanded ? {} : { display: 'none' }}>
          <ListOfFields tableName={tableName} fields={fields} />
        </ul>
      </li>
    )
  })
}
