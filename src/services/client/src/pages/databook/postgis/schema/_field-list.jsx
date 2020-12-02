import { useContext, useRef } from 'react'
import { Typography } from '@material-ui/core'
import QuickForm from '@saeon/quick-form'
import clsx from 'clsx'
import useStyles from './style'
import { context as databooksContext } from '../..//context'
import RenameEntity from './bak/rename-entity'
import ContextMenu from './_context-menu'
import Field from './_field'

export default ({ tableName, fields }) => {
  const classes = useStyles()
  const context = useContext(databooksContext)

  return [...fields]
    .sort(({ ordinal_position: a }, { ordinal_position: b }) => (a > b ? 1 : -1))
    .map(({ id, column_name, data_type }) => {
      return (
        <Field
          key={id}
          id={id}
          tableName={tableName}
          column_name={column_name}
          data_type={data_type}
        />
      )

      const inputRef = useRef(null)
      const handleFocus = () => {
        inputRef.current.focus()
      }
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
                    inputRef={inputRef}
                    entityType="column"
                  >
                    {renameEntityLazy => {
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
                        <ContextMenu
                          uniqueIdentifier={`${tableName}-${column_name}`}
                          menuItems={[
                            {
                              value: 'Rename',
                              onClick: () => {
                                update({ editActive: true })
                                handleFocus()
                              },
                            },
                          ]}
                        >
                          <input
                            size={text.length} //giving a minimum size to smooth out list of secondaryText's
                            autoComplete={'off'}
                            value={text}
                            ref={inputRef}
                            className={editActive ? clsx(classes.renamingText) : clsx(classes.text)}
                            onInput={e => {
                              update({ text: e.target.value })
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                onEnter(e)
                              } else if (['Escape', 'Tab'].includes(e.key)) {
                                update({ editActive: false })
                                update({ text: column_name })
                                console.log('editActive', editActive)
                              }
                            }}
                            onBlur={() => {
                              update({ editActive: false })
                              update({ text: column_name })
                            }}
                          />
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
