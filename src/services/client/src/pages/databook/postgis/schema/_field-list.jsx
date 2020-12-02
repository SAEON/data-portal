import { useContext } from 'react'
import { context as databooksContext } from '../..//context'
import { Typography } from '@material-ui/core'
import ContextMenu from './_context-menu'
import QuickForm from '@saeon/quick-form'
import clsx from 'clsx'
import useStyles from './style'
import RenameEntity from './bak/rename-entity'

export default ({ tableName, fields }) => {
  const classes = useStyles()
  const context = useContext(databooksContext)
  return [...fields]
    .sort(({ ordinal_position: a }, { ordinal_position: b }) => (a > b ? 1 : -1))
    .map(({ id, column_name, data_type }) => {
      return (
        <li key={id} className={clsx(classes.hoverHighlight)}>
          <div style={{ display: 'flex', inlineSize: 'max-content' }}>
            <QuickForm editActive={false} text={column_name}>
              {(update, { editActive, text }) => {
                return (
                  <RenameEntity
                    variables={{
                      id: context.databook.doc._id,
                      tableName: tableName,
                      newName: text,
                      columnName: column_name,
                    }}
                    entityType="column"
                  >
                    {renameEntityLazy => {
                      // TEXT WHILE RENAMING
                      if (editActive) {
                        const onEnter = e => {
                          update({ editActive: false })
                          const result = renameEntityLazy()
                          if (result?.error) {
                            //STEVEN TO DO: if error: warn user
                            console.log('onEnter error', result?.error)
                            update({ text: column_name })
                          }
                        }
                        return (
                          <input
                            size={text.length + 1} //giving a minimum size to smooth out list of secondaryText's
                            autoComplete={'off'}
                            value={text}
                            className={clsx(classes.renamingText)}
                            onInput={e => {
                              update({ text: e.target.value })
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                onEnter(e)
                              } else if (['Escape', 'Tab'].includes(e.key)) {
                                update({ editActive: false })
                                update({ text: column_name })
                                setTimeout(() => {
                                  update({ editActive: false })
                                  console.log('editActive', editActive)
                                }, 50) //NOT ideal. To be reworked asap to avoid needing a timeout. editActive is not changing value otherwise currently
                              }
                            }}
                            onBlur={() => {
                              update({ editActive: false })
                              update({ text: column_name })
                            }}
                          />
                        )
                      }
                      // STANDARD TEXT
                      else
                        return (
                          <ContextMenu
                            uniqueIdentifier={`${tableName}-${column_name}`}
                            menuItems={[
                              { value: 'Rename', onClick: () => update({ editActive: true }) },
                            ]}
                          >
                            <Typography className={clsx(classes.text)}>{column_name}</Typography>
                          </ContextMenu>
                        )
                    }}
                  </RenameEntity>
                )
              }}
            </QuickForm>

            <Typography className={clsx(classes.secondaryText)}>{data_type}</Typography>
          </div>
        </li>
      )
    })
}

// variables={{
//   id: context.databook.doc._id,
//   tableName: tableName,
//   newName: text,
//   columnName: column_name,
