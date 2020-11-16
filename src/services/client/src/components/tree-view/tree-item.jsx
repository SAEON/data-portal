import React, { useState } from 'react'
// import { Grid } from '@material-ui/core'
import OpenIcon from 'mdi-react/MenuDownIcon'
import ClosedIcon from 'mdi-react/MenuRightIcon'
import InputBase from '@material-ui/core/InputBase'
// import clsx from 'clsx'
import useStyles from './style'
// import { FixedSizeList as List } from 'react-window'

const ICON_SIZE = 22
const ICON_STYLE = { marginBottom: -6, marginRight: 0, marginLeft: -6 }

/* 
    A Tree Item is either a Schema, Table, or Column. Columns are not expandble where as others are.
*/

export default props => {
  const { itemDepth, expandable, primaryText, secondaryText, children } = props
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const indentation = itemDepth * 13
  const classes = useStyles()

  return (
    <div style={{ paddingLeft: indentation }}>
      {/* Expansion Icon */}
      {expandable ? (
        expanded ? (
          <OpenIcon
            size={ICON_SIZE}
            style={ICON_STYLE}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        ) : (
          <ClosedIcon
            size={ICON_SIZE}
            style={ICON_STYLE}
            onClick={() => {
              setExpanded(!expanded)
            }}
          />
        )
      ) : null}
      {/* Text */}
      <InputBase
        className={classes.margin}
        defaultValue={primaryText}
        inputProps={{ 'aria-label': 'naked' }}
        disabled={!editing}
        onDoubleClick={() => {
          setEditing(true)
        }}
        onBlur={() => {
          console.log(primaryText + ' blurred')
          setEditing(false)
        }}
        style={{ width: '90%' }}
      />
      {/* <span
        onClick={() => {
          setExpanded(!expanded)
        }}
        onDoubleClick={() => {
          console.log(`double clicked ${primaryText}`)
        }}
      >
        {primaryText}
      </span> */}
      <span style={{ color: 'rgba(0, 0, 0, 0.4)' }}> {secondaryText}</span>
      {/* Child Tree Items */}
      {expandable && !expanded ? undefined : children}
    </div>
  )
}
