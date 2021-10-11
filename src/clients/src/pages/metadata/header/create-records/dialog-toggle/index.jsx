import Button from '@material-ui/core/Button'
import AddIcon from 'mdi-react/AddBoxIcon'
import Tooltip from '@material-ui/core/Tooltip'

export default ({ open, setOpen }) => (
  <Tooltip title="Create new metadata">
    <Button
      onClick={() => setOpen(!open)}
      startIcon={<AddIcon size={18} />}
      size="small"
      variant="text"
    >
      New record(s)
    </Button>
  </Tooltip>
)
