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
  children = undefined,
  dialogueContentProps,
  dialogueProps,
  paperProps,
}) => {
  const [feedbackDialogueOpen, setFeedbackDialogueOpen] = useState(false)

  return (
    <>
      <Tooltip placement="right-end" title={tooltipTitle}>
        <IconButton onClick={() => setFeedbackDialogueOpen(!feedbackDialogueOpen)} {...iconProps}>
          <InfoIcon fontSize={iconProps?.fontSize || 'default'} />
        </IconButton>
      </Tooltip>
      <Dialog
        {...dialogueProps}
        open={feedbackDialogueOpen}
        onClose={() => setFeedbackDialogueOpen(false)}
        PaperProps={paperProps}
      >
        <DialogContent {...dialogueContentProps}>
          <DialogTitle>
            {typeof title === 'function' ? title(() => setFeedbackDialogueOpen(false)) : title}
          </DialogTitle>
          {children || <DialogContentText>{text}</DialogContentText>}
        </DialogContent>
      </Dialog>
    </>
  )
}
