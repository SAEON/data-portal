import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import DeleteIcon from '@mui/icons-material/Delete'

export const DeleteLayer = ({ onClick }) => {
  return (
    <Tooltip placement="top" title="Remove layer from the map (re-add via the search tab)">
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

export const ToggleVisibility = ({ visible, toggleVisible, ...props }) => {
  return (
    <Tooltip placement="top" title="Show/hide layer">
      <IconButton {...props} size="small" onClick={toggleVisible}>
        {visible ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
      </IconButton>
    </Tooltip>
  )
}
