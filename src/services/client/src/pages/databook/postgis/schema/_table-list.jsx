import { useState, useContext } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import InfoIcon from 'mdi-react/InformationVariantIcon'
import CloseIcon from 'mdi-react/CloseIcon'
import TableIcon from 'mdi-react/TableIcon'
import clsx from 'clsx'
import ListOfFields from './_field-list'
import useStyles from './style'
import ContextMenu from './_context-menu'
import RenameOperator from './_rename-operator'
import { context as databooksContext } from '../../context'
import MessageDialogue from '../../../../components/message-dialogue'
import Record from '../../../record'

export default ({ tables }) => {
  return [...tables]
    .sort(({ table_schema }) => {
      return table_schema === 'public' ? 1 : -1
    })
    .map(({ id: tableName, fields, table_schema }) => {
      return (
        <Table key={tableName} tableName={tableName} fields={fields} tableSchema={table_schema} />
      )
    })
}

const Table = ({ tableName, fields, tableSchema }) => {
  const theme = useTheme()
  const [editActive, setEditActive] = useState(false)
  const [text, setText] = useState(tableName)
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const classes = useStyles()
  const { databook } = useContext(databooksContext)
  const inputId = `${databook.doc._id}-${tableName}`
  const handleFocus = () => {
    document.getElementById(inputId).focus()
  }

  const isSharedTable = tableSchema === 'public'

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
              disabled: isSharedTable,
            },
          ]}
        >
          <span
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ display: 'flex', inlineSize: 'auto' }}
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
                flexGrow: 1,
              }}
            >
              <TableIcon
                size={20}
                style={{ minWidth: 20, marginRight: '2px', cursor: 'pointer' }}
              />
              <RenameOperator
                variables={{
                  id: databook.doc._id,
                  tableName: tableName,
                  newName: text,
                }}
                entityType="table"
              >
                {renameEntityLazy => {
                  const onEnter = () => {
                    setEditActive(false)
                    const result = renameEntityLazy()
                    if (result?.error) {
                      //STEVEN TO DO: if error: warn user
                      console.log('onEnter error', result?.error)
                      setText(tableName)
                    }
                  }
                  return (
                    <input
                      style={{
                        width: '100%',
                        textOverflow: 'ellipsis',
                        color: isSharedTable ? theme.palette.grey[500] : 'inherit',
                      }}
                      id={inputId}
                      autoComplete="off"
                      readOnly={!editActive}
                      value={text}
                      className={clsx(classes.inputField, {
                        [classes.inputFieldActive]: editActive,
                      })}
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
            <span
              style={{
                marginLeft: 'auto',
                marginRight: 0,
                display: hovered ? 'inherit' : 'none',
              }}
            >
              <MessageDialogue
                icon={<InfoIcon size={14} style={{ marginRight: 1 }} />}
                handleClose={() => setHovered(false)}
                title={onClose => (
                  <div style={{ display: 'flex' }}>
                    <Typography style={{ marginRight: 'auto', alignSelf: 'center' }}>
                      METADATA RECORD
                    </Typography>
                    <IconButton
                      onClick={e => {
                        e.stopPropagation()
                        setHovered(false)
                        onClose()
                      }}
                      style={{ marginLeft: 'auto', alignSelf: 'center' }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>
                )}
                tooltipProps={{
                  placement: 'right',
                  title: isSharedTable
                    ? `Read-only shared table`
                    : `Show metadata information for this table`,
                }}
                iconProps={{ size: 'small' }}
                dialogueContentProps={{ style: { padding: 0 } }}
                dialogueProps={{ fullWidth: true }}
                paperProps={{ style: { maxWidth: 'none', minHeight: '84px' } }}
              >
                {isSharedTable ? (
                  <div>Some kind of information should be here regarding this shared layer</div>
                ) : (
                  // TODO - this should not be static
                  <Record id={'10.15493/SARVA.DWS.10000001'} />
                )}
              </MessageDialogue>
            </span>
          </span>
        </ContextMenu>

        <ul
          className={clsx(classes.ulReset)}
          style={{ marginLeft: '5px', display: expanded ? undefined : 'none' }}
        >
          <ListOfFields tableName={tableName} fields={fields} tableSchema={tableSchema} />
        </ul>
      </>
    </li>
  )
}
