import { useState, useContext, useRef } from 'react'
import { context as databooksContext } from '../..//context'
import { Typography } from '@material-ui/core'
import ContextMenu from './_context-menu'
import QuickForm from '@saeon/quick-form'
import clsx from 'clsx'
import useStyles from './style'
import RenameEntity from './bak/rename-entity'

export default ({ id, tableName, column_name, data_type }) => {
  const [editActive, setEditActive] = useState(false)
  const [text, setText] = useState(column_name)
  const classes = useStyles()
  const context = useContext(databooksContext)
  const inputRef = useRef(null)
  const handleFocus = () => {
    inputRef.current.focus()
  }
  return (
    <li key={id} className={clsx(classes.hoverHighlight)}>
      <div style={{ display: 'flex', inlineSize: 'max-content' }}>
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
                  size={text.length} //giving a minimum size to smooth out list of secondaryText's
                  autoComplete={'off'}
                  value={text}
                  ref={inputRef}
                  className={editActive ? clsx(classes.renamingText) : clsx(classes.text)}
                  onInput={e => {
                    setText(e.target.value)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      onEnter(e)
                    } else if (['Escape', 'Tab'].includes(e.key)) {
                      setEditActive(false)
                      setText(column_name)
                      console.log('editActive', editActive)
                    }
                  }}
                  onBlur={() => {
                    setEditActive(false)
                    setText(column_name)
                  }}
                />
              </ContextMenu>
            )
          }}
        </RenameEntity>

        <Typography className={clsx(classes.secondaryText)}>{data_type}</Typography>
      </div>
    </li>
  )
}
