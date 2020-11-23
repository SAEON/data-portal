import { useState, useContext, useRef } from 'react'
import { context as databooksContext } from '../../../context'
import OpenIcon from 'mdi-react/MenuDownIcon'
import ClosedIcon from 'mdi-react/MenuRightIcon'
import clsx from 'clsx'
import useStyles from './style'
import { gql, useMutation } from '@apollo/client'
import ContextMenu from './context-menu'
import MutationTester from './mutation-tester'
// import { FixedSizeList as List } from 'react-window'

const iconSizeSmall = 22
// const iconSizeBig = iconSizeSmall //32

export default props => {
  const context = useContext(databooksContext)
  const { itemDepth, primaryText, secondaryText, children, tableId, uniqueIdentifier } = props

  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(primaryText)

  const indentation = itemDepth * 13

  const itemType = itemDepth === 1 ? 'table' : 'column'
  const classes = useStyles()

  const onEnter = async () => {
    setEditing(false)
    //use mutation
  }

  return (
    <>
      {/* <MutationTester /> */}
      <div style={{ paddingLeft: indentation }}>
        {/* Expansion Icon (Tables only) */}
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
        {/* Text */}
        <ContextMenu uniqueIdentifier={`contexify-menu-${uniqueIdentifier}`}>
          {({ renaming, setRenaming }) => {
            return (
              <>
                <span
                  style={renaming ? { color: '#00b4ff' } : {}}
                  id={`rename-friendly-${uniqueIdentifier}`}
                  contentEditable={renaming}
                  className={clsx(classes.text)}
                  onClick={() => setExpanded(!expanded)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      onEnter(this, e)
                      setRenaming(false)
                    }
                  }}
                  onInput={e => {
                    setText(e.target.innerHTML)
                  }}
                  onBlur={() => {
                    onEnter
                    setRenaming(false)
                  }}
                >
                  {primaryText}
                </span>
                <span style={{ color: 'rgba(0, 0, 0, 0.4)' }}> {secondaryText}</span>
              </>
            )
          }}
        </ContextMenu>
        {/* Child Columns */}
        <div style={expanded ? {} : { visibility: 'hidden', height: '0' }}>{children}</div>
      </div>
    </>
  )
}
