import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Tooltip from '@mui/material/Tooltip'
import { nanoid } from 'nanoid'
import ToggleButton from './_toggle-button'

export default ({
  actions = undefined,
  ariaLabel = 'Toggle dialogue',
  badgeProps = undefined,
  buttonProps = {},
  buttonType = 'icon',
  children = undefined,
  defaultOpen = false,
  dialogueContentProps,
  dialogueProps,
  disabled = false,
  hideIcon = false,
  icon = undefined,
  iconProps,
  id,
  onOpenEffect = undefined,
  paperProps,
  permanent = false,
  text = 'Text missing',
  title = undefined,
  titleProps = {},
  tooltipProps,
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

        {actions ? (
          <DialogActions>
            {actions.map((Action, i) => (
              <Action toggle={() => setOpen(!open)} key={i} />
            ))}
          </DialogActions>
        ) : null}
      </Dialog>
    </span>
  )
}
