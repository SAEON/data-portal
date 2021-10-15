import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CancelIcon from 'mdi-react/CancelIcon'
import Typography from '@mui/material/Typography'
import Mutation from './mutation'
import Button from '@mui/material/Button'

export default ({ Button: B, id, immutableResource }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <B open={open} setOpen={setOpen} />
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Update record data format</DialogTitle>
        <DialogContent>
          <Typography gutterBottom variant="body2">
            This record does not include data format information. To fill this in, the catalogue
            will download the datasets in the background to check if the archive contents match any
            known data types.
          </Typography>
          <Typography gutterBottom variant="body2">
            This process can take several minutes. After clicking &quot;Accept&quot;, check back in
            several minutes to see if your dataset updated.
          </Typography>
          <Typography gutterBottom variant="body2">
            Only shapefile identification is supported at this point. If the data associated with
            this record is NOT a vector format, then no change to the record will occur
          </Typography>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            startIcon={<CancelIcon size={18} />}
            variant="text"
            size="small"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Mutation immutableResource={immutableResource} setOpen={setOpen} id={id} />
        </DialogActions>
      </Dialog>
    </>
  )
}
