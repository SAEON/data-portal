import Button from '@material-ui/core/Button'
import AddIcon from 'mdi-react/AddBoxIcon'

export default ({ open, setOpen }) => (
  <Button
    onClick={() => setOpen(!open)}
    startIcon={<AddIcon size={18} />}
    size="small"
    variant="text"
  >
    New record(s)
  </Button>
)
