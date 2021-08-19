import Button from '@material-ui/core/Button'
import NewCollectionIcon from 'mdi-react/DatabaseAddIcon'

export default () => {
  return (
    <Button
      startIcon={<NewCollectionIcon size={18} />}
      variant="text"
      size="small"
      disableElevation
    >
      Create collection
    </Button>
  )
}
