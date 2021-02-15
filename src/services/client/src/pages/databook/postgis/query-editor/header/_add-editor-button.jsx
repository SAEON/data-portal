import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import PlusIcon from 'mdi-react/PlusIcon'

export default ({ onClick }) => (
  <Tooltip title="Create new SQL editor" placement="right-start">
    <IconButton onClick={onClick} size="small">
      <PlusIcon size={14} />
    </IconButton>
  </Tooltip>
)
