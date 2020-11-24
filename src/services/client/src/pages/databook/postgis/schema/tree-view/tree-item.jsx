import { useState, useContext, useRef } from 'react'
import { context as databooksContext } from '../../../context'
import OpenIcon from 'mdi-react/MenuDownIcon'
import ClosedIcon from 'mdi-react/MenuRightIcon'
import clsx from 'clsx'
import useStyles from './style'
import ContextMenu from './context-menu'
import { RenameTable } from './rename-entities'
import { useEffect } from 'react'
// import { FixedSizeList as List } from 'react-window'

const iconSizeSmall = 22
// const iconSizeBig = iconSizeSmall //32

export default props => {
  const context = useContext(databooksContext)
  const { itemDepth, primaryText, secondaryText, children, uniqueIdentifier } = props
  const [expanded, setExpanded] = useState(false)
  const [text, setText] = useState(primaryText)

  const indentation = itemDepth * 13

  const itemType = itemDepth === 1 ? 'table' : 'column'
  const classes = useStyles()
  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleFocus = () => {
    inputRef.current.focus()
  }

  return (
    <>
      <div style={{ paddingLeft: indentation }}>
        {/* EXPANSION ICON (Tables only) */}
        {itemType === 'column' ? undefined : expanded ? (
          <OpenIcon
            size={iconSizeSmall}
            className={clsx(classes.icon)}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        ) : (
          <ClosedIcon
            size={iconSizeSmall}
            className={clsx(classes.icon)}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        )}
        {/* TEXT */}
        <ContextMenu
          uniqueIdentifier={`contexify-menu-${uniqueIdentifier}`}
          handleFocus={handleFocus}
        >
          {({ renaming, setRenaming }) => {
            return (
              <>
                <RenameTable
                  variables={{
                    id: context.databook.doc._id,
                    tableName: primaryText,
                    newName: text,
                  }}
                  inputRef={inputRef}
                >
                  {renameEntityLazy => {
                    const onEnter = e => {
                      e.preventDefault()
                      setRenaming(false)
                      const result = renameEntityLazy()
                      //STEVEN TO DO: if error: setText(originalText) & warn user
                    }

                    return (
                      <>
                        <input
                          autoComplete={'off'}
                          readOnly={!renaming}
                          value={text}
                          ref={inputRef}
                          className={renaming ? clsx(classes.renamingText) : clsx(classes.text)}
                          onClick={() => {
                            if (!renaming) setExpanded(!expanded)
                          }}
                          onInput={e => {
                            setText(e.target.value)
                          }}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              onEnter(e)
                            }
                          }}
                          onBlur={() => {
                            setRenaming(false)
                            setText(primaryText)
                          }}
                        ></input>
                        <span className={clsx(classes.secondaryText)}>{secondaryText}</span>
                      </>
                    )
                  }}
                </RenameTable>
              </>
            )
          }}
        </ContextMenu>
        {/* CHILD COLUMNS */}
        <div className={expanded ? {} : clsx(classes.hidden)}>{children}</div>
      </div>
    </>
  )
}
