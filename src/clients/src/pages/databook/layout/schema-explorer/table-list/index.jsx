import { useState, useContext } from 'react'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles';
import InfoIcon from 'mdi-react/InformationVariantIcon'
import Tooltip from '@mui/material/Tooltip'
import CloseIcon from 'mdi-react/CloseIcon'
import TableIcon from 'mdi-react/TableIcon'
import clsx from 'clsx'
import FieldList from '../_field-list'
import useStyles from '../style'
import ContextMenu from '../_context-menu'
import RenameOperator from '../_rename-operator'
import { context as databookContext } from '../../../contexts/databook-provider'
import MessageDialogue from '../../../../../components/message-dialogue'
import Record from '../../../../record'
import MarkPublic from './_mark-public'

const Table = ({ tableName, fields, tableSchema, isPublic, odpRecordId, description }) => {
  const theme = useTheme()
  const [editActive, setEditActive] = useState(false)
  const [text, setText] = useState(tableName)
  const [hovered, setHovered] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const classes = useStyles()
  const { id: databookId } = useContext(databookContext)
  const inputId = `${databookId}-${tableName}`
  const handleFocus = () => {
    document.getElementById(inputId).focus()
  }

  const isSharedTable = tableSchema === 'public'

  return (
    <li key={tableName} className={clsx(classes.liReset)}>
      <span
        style={{ display: 'flex' }}
        className={clsx(classes.hover)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <ContextMenu
          uniqueIdentifier={tableName}
          style={{ width: '100%' }}
          menuItems={[
            {
              value: 'Rename',
              onClick: () => {
                setEditActive(true)
                handleFocus()
              },
              disabled: isSharedTable,
            },
            {
              Item: MarkPublic,
              value: 'Mark public',
              tableName,
              onClick: () => {
                handleFocus()
              },
              disabled: isSharedTable,
            },
          ]}
        >
          <span>
            <Tooltip
              title={isPublic ? `${text} (this schema object can be read publicly)` : text}
              placement="right-end"
            >
              <span
                onClick={() => {
                  if (!editActive) setExpanded(!expanded)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexGrow: 1,
                  color: isPublic ? theme.palette.warning.dark : theme.palette.common.black,
                }}
              >
                <TableIcon
                  size={20}
                  style={{ minWidth: 20, marginRight: '2px', cursor: 'pointer' }}
                />
                <RenameOperator
                  variables={{
                    id: databookId,
                    tableName: tableName,
                    newName: text,
                  }}
                  entityType="table"
                >
                  {renameEntityLazy => {
                    const onEnter = () => {
                      setEditActive(false)
                      renameEntityLazy()
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
                        value={editActive ? text : `${isPublic ? '(public) ' : ''}${text}`}
                        className={clsx(classes.inputField, {
                          [classes.inputFieldActive]: editActive,
                        })}
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
            </Tooltip>
          </span>
        </ContextMenu>
        {/* View Metadata (i) button */}
        <span
          // style={{ display: 'flex', inlineSize: 'auto', position: 'absolute' }}
          className={clsx(classes.hover)}
          style={{
            marginLeft: 'auto',
            marginRight: 0,
            display: hovered ? 'inherit' : 'none',
          }}
        >
          {/* TODO this dialogue code is repeated 2 other places */}
          <MessageDialogue
            icon={<InfoIcon size={14} style={{ marginRight: 1 }} />}
            handleClose={() => setHovered(false)}
            title={onClose => (
              <div style={{ display: 'flex' }}>
                <Typography style={{ marginRight: 'auto', alignSelf: 'center' }}>
                  {isSharedTable ? 'Read-only table' : 'SAEON dataset'}
                </Typography>
                <IconButton
                  size="small"
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
            dialogueProps={{ fullWidth: !isSharedTable }}
            titleProps={{
              style: { paddingRight: theme.spacing(2), paddingLeft: theme.spacing(2) },
            }}
            paperProps={{
              style: { maxWidth: 'none', minHeight: '66px' },
            }}
          >
            {isSharedTable ? (
              <DialogContent style={{ padding: theme.spacing(2) }}>
                <Typography>{description}</Typography>
              </DialogContent>
            ) : (
              <Record id={odpRecordId} />
            )}
          </MessageDialogue>
        </span>
      </span>

      <ul
        className={clsx(classes.ulReset)}
        style={{ marginLeft: '5px', display: expanded ? undefined : 'none' }}
      >
        <FieldList tableName={tableName} fields={fields} tableSchema={tableSchema} />
      </ul>
    </li>
  )
}

export default ({ tables }) => {
  return [...tables]
    .sort(({ table_schema }) => {
      return table_schema === 'public' ? 1 : -1
    })
    .map(({ id: tableName, fields, table_schema, odpRecordId, description, isPublic }) => {
      return (
        <Table
          key={tableName}
          tableName={tableName}
          fields={fields}
          isPublic={isPublic}
          tableSchema={table_schema}
          odpRecordId={odpRecordId}
          description={description}
        />
      )
    })
}
