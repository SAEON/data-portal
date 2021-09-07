import { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Tooltip from '@material-ui/core/Tooltip'
import { nanoid } from 'nanoid'
import ToggleButton from './_toggle-button'

export default ({
  id,
  iconProps,
  tooltipProps,
  buttonType = 'icon',
  title = undefined,
  titleProps = {},
  text = 'Text missing',
  children = undefined,
  dialogueContentProps,
  dialogueProps,
  paperProps,
  icon = undefined,
  onOpenEffect = undefined,
  badgeProps = undefined,
  hideIcon = false,
  defaultOpen = false,
  ariaLabel = 'Toggle dialogue',
  permanent = false,
  buttonProps = {},
  disabled = false,
  handleClose = () => {},
}) => {
  const [open, setOpen] = useState(defaultOpen)

  id = id || nanoid()

  useEffect(() => {
    if (open && onOpenEffect) {
      onOpenEffect()
    }
  }, [open, onOpenEffect])

  return (
    <span onClick={e => e.stopPropagation()}>
      {/* TOGGLE BUTTON */}
      {hideIcon ? undefined : (
        <Tooltip placement="right-end" {...tooltipProps}>
          <span>
            <ToggleButton
              buttonType={buttonType}
              disabled={disabled}
              ariaLabel={ariaLabel}
              id={id}
              setOpen={setOpen}
              badgeProps={badgeProps}
              icon={icon}
              open={open}
              {...iconProps}
              {...buttonProps}
            />
          </span>
        </Tooltip>
      )}

      {/* DIALOGUE */}
      <Dialog
        disableScrollLock
        id={id}
        {...dialogueProps}
        open={open}
        onClose={(e, reason) => {
          if (permanent && reason) {
            return
          }
          handleClose()
          setOpen(false)
        }}
        PaperProps={paperProps}
      >
        {/* TITLE */}
        {title ? (
          <DialogTitle {...titleProps}>
            {typeof title === 'function' ? title(() => setOpen(false)) : title}
          </DialogTitle>
        ) : undefined}

        {/**
         * CONTENT
         *
         * if 'children' is provided, then assume
         * that the controlling component is providing
         * the content.
         *
         * Otherwise render the text
         *
         */}

        {children ? (
          typeof children === 'function' ? (
            children(() => setOpen(false), open)
          ) : (
            children
          )
        ) : (
          <DialogContent {...dialogueContentProps}>{text}</DialogContent>
        )}
      </Dialog>
    </span>
  )
}
