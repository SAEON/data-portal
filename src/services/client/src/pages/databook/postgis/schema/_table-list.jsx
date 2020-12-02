import { useState, useContext } from 'react'
import { IconButton } from '@material-ui/core'
import InfoIcon from 'mdi-react/InformationVariantIcon'
import TableIcon from 'mdi-react/TableIcon'
import clsx from 'clsx'
import ListOfFields from './_field-list'
import useStyles from './style'
import ContextMenu from './_context-menu'
import RenameOperator from './_rename-operator'
import { context as databooksContext } from '../..//context'

export default ({ tables }) => {
  return tables.map(({ id: tableName, fields }) => {
    return <Table key={tableName} tableName={tableName} fields={fields} />
  })
}

const Table = ({ tableName, fields }) => {
  const [editActive, setEditActive] = useState(false)
  const [text, setText] = useState(tableName)
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const classes = useStyles()
  const context = useContext(databooksContext)
  const inputId = `${context.databook.doc._id}-${tableName}`
  const handleFocus = () => {
    document.getElementById(inputId).focus()
  }
  console.log('THIS THING', context)
  return (
    <li key={tableName} className={clsx(classes.liReset)}>
      {/* if (editActive)  <input defaultValue="text" /> // TODO handle table mutation here */}
      <>
        <ContextMenu
          uniqueIdentifier={tableName}
          menuItems={[
            {
              value: 'Rename',
              onClick: () => {
                setEditActive(true)
                handleFocus()
              },
              disabled: !Object.keys(context.databook.doc.tables).includes(tableName),
            },
          ]}
        >
          <span
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ display: 'flex', inlineSize: 'max-content' }}
            className={clsx(classes.hoverHighlight)}
          >
            {/* Table Icon and text */}
            <span
              onClick={() => {
                if (!editActive) setExpanded(!expanded)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TableIcon size={20} style={{ minWidth: 20, marginRight: '2px' }} />
              <RenameOperator
                variables={{
                  id: context.databook.doc._id,
                  tableName: tableName,
                  newName: text,
                }}
                entityType="table"
              >
                {renameEntityLazy => {
                  const onEnter = e => {
                    //   e.preventDefault()
                    setEditActive(false)
                    const result = renameEntityLazy()
                    if (result?.error) {
                      //STEVEN TO DO: if error: warn user
                      console.log('onEnter error', result?.error)
                      SetText(tableName)
                    }
                  }
                  return (
                    <input
                      id={inputId}
                      size={text.length + 1} //giving a minimum size to smooth out list of secondaryText's
                      autoComplete="off"
                      readOnly={!editActive}
                      value={text}
                      className={editActive ? clsx(classes.renamingText) : clsx(classes.text)}
                      onFocus={e => {
                        console.log('editActive', editActive)
                        if (editActive) e.currentTarget.select() //STEVEN TODO: bug: editActive being seen as false always
                      }}
                      onInput={e => {
                        setText(e.target.value)
                      }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          onEnter(e)
                        } else if (['Escape', 'Tab'].includes(e.key)) {
                          setEditActive(false)
                          setText(tableName)
                        }
                      }}
                      onBlur={() => {
                        setEditActive(false)
                        setText(tableName)
                      }}
                    />
                  )
                }}
              </RenameOperator>
            </span>
            {/* View Metadata (i) button */}
            <span style={hovered ? {} : { visibility: 'hidden' }}>
              <IconButton size={'small'}>
                <InfoIcon />
              </IconButton>
            </span>
          </span>
        </ContextMenu>

        <ul
          className={clsx(classes.ulReset)}
          style={{ marginLeft: '5px', display: expanded ? undefined : 'none' }}
        >
          <ListOfFields tableName={tableName} fields={fields} />
        </ul>
      </>
    </li>
  )
}
