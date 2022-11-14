import { useState } from 'react'
import UAParser from 'ua-parser-js'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const parseUa = new UAParser()
const isIE = parseUa.getBrowser().name === 'IE'

export default ({ children }) => {
  const [open, setOpen] = useState(false)
  const [accepted, setAccepted] = useState(false)

  if (isIE) {
    if (!accepted) {
      setAccepted(true)
      setOpen(true)
    }
  }

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>
          <Typography>Browser version is not supported.</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Many features of this website will not work as expected on this browser (including
            viewing maps). A newer browser (Chrome, Edge, Firefox, Safari, etc.) will certainly
            provide a nicer experience.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Okay</Button>
        </DialogActions>
      </Dialog>
      {children}
    </>
  )
}
