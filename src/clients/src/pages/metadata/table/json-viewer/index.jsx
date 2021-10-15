import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button'

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
