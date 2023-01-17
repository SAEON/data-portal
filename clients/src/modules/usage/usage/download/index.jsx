import { useState } from 'react'
import Button from '@mui/material/Button'
import { Download as DownloadIcon } from '../../../../components/icons'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'

export default () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* TOGGLE */}
      <Button
        onClick={() => setOpen(true)}
        startIcon={<DownloadIcon fontSize="small" />}
        variant="text"
        size="small"
        disableElevation
      >
        Download Usage data
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
