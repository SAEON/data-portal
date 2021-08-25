import Button from '@material-ui/core/Button'
import NewListIcon from 'mdi-react/DatabaseAddIcon'

export default () => {
  return (
    <Button startIcon={<NewListIcon size={18} />} variant="text" size="small" disableElevation>
      New list
    </Button>
  )
}
