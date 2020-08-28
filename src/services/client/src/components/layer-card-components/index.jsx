import React from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import {
  ExpandLess,
  ExpandMore,
  Visibility,
  VisibilityOff,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'

export const AddLayer = ({ onClick }) => {
  return (
    <Tooltip title="Add data layer to map">
      <IconButton onClick={onClick} style={{ marginLeft: 'auto' }} size="small">
        <AddIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}

export const DeleteLayer = ({ onClick }) => {
  return (
    <Tooltip title="Remove layer from the map (re-add via the search tab)">
      <IconButton size="small" onClick={onClick}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  )
}

export const ExpandLayer = ({ expanded, toggleExpanded }) => {
  return (
    <Tooltip placement="right" title="Explore layer, download data, etc.">
      <IconButton size="small" style={{ marginLeft: 'auto' }} onClick={toggleExpanded}>
        {expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </IconButton>
    </Tooltip>
  )
}

export const ToggleVisibility = ({ visible, toggleVisible }) => {
  return (
    <Tooltip title="Show/hide layer">
      <IconButton
        style={{ marginLeft: 'auto', alignSelf: 'center' }}
        size="small"
        onClick={toggleVisible}
      >
        {visible ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
      </IconButton>
    </Tooltip>
  )
}
