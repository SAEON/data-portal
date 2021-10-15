import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import useTheme from '@material-ui/core/styles/useTheme'
import Button from '@material-ui/core/Button'

export default ({ row, column: { key }, onClose }) => {
  const theme = useTheme()

  return (
    <Dialog maxWidth="xl" onClose={onClose} open={true}>
      <DialogTitle>View JSON</DialogTitle>
      <DialogContent style={{ width: 800, height: 800 }}>
        <pre style={theme.pre}>{JSON.stringify(JSON.parse(row[key]), null, 2)}</pre>
      </DialogContent>
      <DialogActions>
        <Button variant="text" disableElevation size="small" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
