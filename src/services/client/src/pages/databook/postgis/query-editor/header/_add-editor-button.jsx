import { IconButton, Tooltip } from '@material-ui/core'
import PlusIcon from 'mdi-react/PlusIcon'

export default ({ onClick }) => (
  <Tooltip title="Create new SQL editor" placement="right-start">
    <IconButton onClick={onClick} size="small">
      <PlusIcon size={14} />
    </IconButton>
  </Tooltip>
)
