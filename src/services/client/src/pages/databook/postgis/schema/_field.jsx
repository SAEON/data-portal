import { useState, useContext } from 'react'
import { context as databooksContext } from '../..//context'
import { Typography } from '@material-ui/core'
import ContextMenu from './_context-menu'
import clsx from 'clsx'
import useStyles from './style'
import RenameEntity from './bak/rename-entity'

const inputMinSize = 22

export default ({ id, tableName, column_name, data_type }) => {
  const [editActive, setEditActive] = useState(false)
  const [text, setText] = useState(column_name)
  const classes = useStyles()
  const context = useContext(databooksContext)
  const handleFocus = () => {
    const result = document.getElementById(id).focus()
    console.log('result', result)
    console.log('id', id)
  }

  return (
    <li className={clsx(classes.hoverHighlight)}>
      <div style={{ display: 'flex', inlineSize: 'max-content' }}>
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
            const onEnter = e => {
              //   e.preventDefault()
              setEditActive(false)
              const result = renameEntityLazy()
              if (result?.error) {
                //STEVEN TO DO: if error: warn user
                console.log('onEnter error', result?.error)
                SetText(column_name)
              }
            }
            return (
              <ContextMenu
                uniqueIdentifier={`${tableName}-${column_name}`}
                menuItems={[
                  {
                    value: 'Rename',
                    onClick: () => {
                      setEditActive(true)
                      handleFocus()
                    },
                  },
                ]}
              >
                <input
                  id={id}
                  size={text.length < inputMinSize ? inputMinSize : text.length + 1} //giving a minimum size to smooth out list of secondaryText's
                  autoComplete={'off'}
                  readOnly={!editActive}
                  value={text}
                  //   className={editActive}
                  className={editActive ? clsx(classes.renamingText) : clsx(classes.text)}
                  onFocus={e => {
                    if (editActive) e.currentTarget.select()
                  }}
                  onInput={e => {
                    setText(e.target.value)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      onEnter(e)
                    } else if (['Escape', 'Tab'].includes(e.key)) {
                      setEditActive(false)
                      setText(column_name)
                    }
                  }}
                  onBlur={() => {
                    setEditActive(false)
                    setText(column_name)
                  }}
                ></input>
              </ContextMenu>
            )
          }}
        </RenameEntity>

        <Typography className={clsx(classes.secondaryText)}>{data_type}</Typography>
      </div>
    </li>
  )
}
