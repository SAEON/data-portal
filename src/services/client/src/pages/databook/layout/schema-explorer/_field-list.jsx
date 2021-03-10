import { useState, useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import useStyles from './style'
import ContextMenu from './_context-menu'
import RenameOperator from './_rename-operator'
import useTheme from '@material-ui/core/styles/useTheme'
import { context as databookContext } from '../../contexts/databook-provider'

export default ({ tableName, fields, tableSchema }) => {
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
          tableSchema={tableSchema}
        />
      )
    })
}

const Field = ({ id, tableName, column_name, data_type, tableSchema }) => {
  const theme = useTheme()
  const inputMinSize = 22
  const [editActive, setEditActive] = useState(false)
  const [text, setText] = useState(column_name)
  const classes = useStyles()
  const { id: databookId } = useContext(databookContext)
  const handleFocus = () => {
    document.getElementById(id).focus()
  }

  const isSharedTable = tableSchema === 'public'

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
              disabled: isSharedTable,
            },
          ]}
        >
          <RenameOperator
            variables={{
              id: databookId,
              tableName: tableName,
              newName: text,
              columnName: column_name,
            }}
            entityType="column"
          >
            {renameEntityLazy => {
              const onEnter = () => {
                setEditActive(false)
                const result = renameEntityLazy()
                if (result?.error) {
                  //STEVEN TO DO: if error: warn user
                  console.log('onEnter error', result?.error)
                  setText(column_name)
                }
              }
              return (
                <input
                  id={id}
                  style={{
                    color: isSharedTable ? theme.palette.grey[500] : 'inherit',
                  }}
                  size={text.length < inputMinSize ? inputMinSize : text.length + 1} //giving a minimum size to smooth out list of secondaryText's
                  autoComplete="off"
                  readOnly={!editActive}
                  value={text}
                  className={clsx(classes.inputField, {
                    [classes.inputFieldActive]: editActive,
                  })}
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
