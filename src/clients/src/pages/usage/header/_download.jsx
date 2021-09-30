import { useState } from 'react'
import Button from '@material-ui/core/Button'
import DownloadIcon from 'mdi-react/DownloadIcon'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* TOGGLE */}
      <Button
        onClick={() => setOpen(true)}
        startIcon={<DownloadIcon size={18} />}
        variant="text"
        size="small"
        disableElevation
      >
        Download data
      </Button>

      {/* DIALOGUE */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Download usage data</DialogTitle>
        <DialogContent>Not implemented yet</DialogContent>
        <DialogActions>
          <Button variant="contained" size="small" disabled>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
