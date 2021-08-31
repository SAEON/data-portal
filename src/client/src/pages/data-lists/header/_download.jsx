import Button from '@material-ui/core/Button'
import DownloadIcon from 'mdi-react/DownloadMultipleIcon'

export default () => {
  return (
    <Button startIcon={<DownloadIcon size={18} />} variant="text" size="small" disableElevation>
      Download lists details
    </Button>
  )
}
