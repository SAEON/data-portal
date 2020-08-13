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

export default ({
  iconProps,
  tooltipTitle = 'Tooltip title missing',
  title = 'Title missing',
  text = 'Text missing',
}) => {
  const [feedbackDialogueOpen, setFeedbackDialogueOpen] = useState(false)

  return (
    <>
      <Tooltip title={tooltipTitle}>
        <IconButton onClick={() => setFeedbackDialogueOpen(!feedbackDialogueOpen)} {...iconProps}>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={feedbackDialogueOpen} onClose={() => setFeedbackDialogueOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}
