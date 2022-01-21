import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Pre } from '../../../../components/html-tags'

export default ({ row, column: { key }, onClose }) => {
  return (
    <Dialog maxWidth="xl" onClose={onClose} open={true}>
      <DialogTitle>View JSON</DialogTitle>
      <DialogContent sx={{ width: 800, height: 800 }}>
        <Pre>{JSON.stringify(JSON.parse(row[key]), null, 2)}</Pre>
      </DialogContent>
      <DialogActions>
        <Button variant="text" disableElevation size="small" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
