import React, { useState } from 'react'
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Tooltip,
} from '@material-ui/core'
import { Info as InfoIcon } from '@material-ui/icons'

export default ({ iconProps }) => {
  const [feedbackDialogueOpen, setFeedbackDialogueOpen] = useState(false)

  return (
    <>
      <Tooltip title="How do I filter via Geo Location">
        <IconButton
          aria-label="Provide anonymous feedback"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => setFeedbackDialogueOpen(!feedbackDialogueOpen)}
          {...iconProps}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={feedbackDialogueOpen}
        onClose={() => setFeedbackDialogueOpen(false)}
        aria-labelledby="catalogue search feature placeholder"
        aria-describedby="Describe upcoming catalogue search feature"
      >
        <DialogTitle>Coming soon!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We are working hard towards delivering a visual filtering mechanism for our data using
            an interactive map. Whatch this space!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}
