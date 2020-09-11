import React, { useState, useEffect } from 'react'
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
  title = undefined,
  text = 'Text missing',
  children = undefined,
  dialogueContentProps,
  dialogueProps,
  paperProps,
  icon = undefined,
  onOpenEffect = undefined,
  style = {},
}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open && onOpenEffect) {
      onOpenEffect()
    }
  }, [open, onOpenEffect])

  return (
    <div style={{ ...style }} onClick={e => e.stopPropagation()}>
      <Tooltip placement="right-end" {...tooltipProps}>
        <IconButton
          onClick={e => {
            e.stopPropagation()
            setOpen(!open)
          }}
          {...iconProps}
        >
          {icon || <InfoIcon fontSize={iconProps?.fontSize || 'default'} />}
        </IconButton>
      </Tooltip>
      <Dialog {...dialogueProps} open={open} onClose={() => setOpen(false)} PaperProps={paperProps}>
        {title ? (
          <DialogTitle>
            {typeof title === 'function' ? title(() => setOpen(false)) : title}
          </DialogTitle>
        ) : undefined}
        {children || (
          <DialogContent {...dialogueContentProps}>
            <DialogContentText>{text}</DialogContentText>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
