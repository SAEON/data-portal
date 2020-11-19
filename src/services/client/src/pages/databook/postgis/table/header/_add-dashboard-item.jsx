import { useState } from 'react'
import AddItemIcon from 'mdi-react/ViewGridAddIcon'
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'

export default () => {
  const [open, setOpen] = useState(false)

  const theme = useTheme()
  return (
    <>
      {/* TOGGLE DIALOGUE */}
      <IconButton onClick={() => setOpen(true)} size="small">
        <AddItemIcon style={{ color: theme.palette.primary.light }} />
      </IconButton>

      {/* DIALOGUE */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add chart to dashboard</DialogTitle>
        <DialogContent>hi</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              // Call the 'createChart' mutation with data and the form
            }}
            size="small"
            variant="contained"
            color="primary"
            disableElevation
          >
            Create Chart
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
