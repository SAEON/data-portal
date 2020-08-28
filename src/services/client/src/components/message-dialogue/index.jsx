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
  tooltipProps,
  title = 'Title missing',
  text = 'Text missing',
  children = undefined,
  dialogueContentProps,
  dialogueProps,
  paperProps,
  style = {},
}) => {
  const [feedbackDialogueOpen, setFeedbackDialogueOpen] = useState(false)

  return (
    <div style={{ ...style }} onClick={e => e.stopPropagation()}>
      <Tooltip placement="right-end" {...tooltipProps}>
        <IconButton
          onClick={e => {
            e.stopPropagation()
            setFeedbackDialogueOpen(!feedbackDialogueOpen)
          }}
          {...iconProps}
        >
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
    </div>
  )
}
