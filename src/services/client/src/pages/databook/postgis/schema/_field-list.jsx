import { useState, useContext } from 'react'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './style'
import ContextMenu from './_context-menu'
import RenameOperator from './_rename-operator'
import { context as databooksContext } from '../..//context'

export default ({ tableName, fields }) => {
  return [...fields]
    .sort(({ ordinal_position: a }, { ordinal_position: b }) => (a > b ? 1 : -1))
    .map(({ id, column_name, data_type }) => {
      return (
        <Field
          key={id}
          id={`${tableName}-${id}`}
          tableName={tableName}
          column_name={column_name}
          data_type={data_type}
        />
      )
    })
}

const Field = ({ id, tableName, column_name, data_type }) => {
  const inputMinSize = 22
  const [editActive, setEditActive] = useState(false)
  const [text, setText] = useState(column_name)
  const classes = useStyles()
  const context = useContext(databooksContext)
  const handleFocus = () => {
    document.getElementById(id).focus()
  }

  return (
    <li className={clsx(classes.hoverHighlight)}>
      <div style={{ display: 'flex', inlineSize: 'max-content' }}>
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
          <RenameOperator
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
                <input
                  id={id}
                  size={text.length < inputMinSize ? inputMinSize : text.length + 1} //giving a minimum size to smooth out list of secondaryText's
                  autoComplete="off"
                  readOnly={!editActive}
                  value={text}
                  className={editActive ? clsx(classes.renamingText) : clsx(classes.text)}
                  onFocus={e => {
                    if (editActive) e.currentTarget.select() //STEVEN TODO: bug editActive always seen as false
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
                />
              )
            }}
          </RenameOperator>
        </ContextMenu>
        <Typography className={clsx(classes.secondaryText)}>{data_type}</Typography>
      </div>
    </li>
  )
}
