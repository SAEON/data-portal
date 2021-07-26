import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import DeleteIcon from '@material-ui/icons/Delete'

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
