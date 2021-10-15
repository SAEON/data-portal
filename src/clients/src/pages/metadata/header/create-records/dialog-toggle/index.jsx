import Button from '@mui/material/Button'
import AddIcon from 'mdi-react/AddBoxIcon'
import Tooltip from '@mui/material/Tooltip'

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
