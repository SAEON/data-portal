import { useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'
import InfoIcon from 'mdi-react/InformationVariantIcon'
import { nanoid } from 'nanoid'

export default ({
  id,
  iconProps,
  tooltipProps,
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
      {hideIcon ? undefined : (
        <Tooltip placement="right-end" {...tooltipProps}>
          <span>
            <IconButton
              disabled={disabled}
              aria-label={ariaLabel}
              aria-controls={id}
              aria-haspopup="true"
              aria-expanded={open}
              onClick={e => {
                e.stopPropagation()
                setOpen(!open)
              }}
              {...iconProps}
            >
              {badgeProps ? (
                badgeProps._component ? (
                  <badgeProps._component {...badgeProps}>
                    {icon || <InfoIcon size={18} />}
                  </badgeProps._component>
                ) : (
                  <Badge {...badgeProps}>{icon || <InfoIcon size={18} />}</Badge>
                )
              ) : (
                icon || <InfoIcon size={18} />
              )}
            </IconButton>
          </span>
        </Tooltip>
      )}

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
        {title ? (
          <DialogTitle {...titleProps}>
            {typeof title === 'function' ? title(() => setOpen(false)) : title}
          </DialogTitle>
        ) : undefined}
        <div style={{ position: 'relative' }}>
          {children && typeof children === 'function'
            ? children(() => setOpen(false), open)
            : children}
          {children ? null : <DialogContent {...dialogueContentProps}>{text}</DialogContent>}
        </div>
      </Dialog>
    </span>
  )
}
