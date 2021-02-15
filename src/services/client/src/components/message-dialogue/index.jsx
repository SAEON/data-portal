import { useState, useEffect } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'
import InfoIcon from '@material-ui/icons/Info'

export default ({
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
  permanent = false,
  handleClose = () => {},
}) => {
  const [open, setOpen] = useState(defaultOpen)

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
              onClick={e => {
                e.stopPropagation()
                setOpen(!open)
              }}
              {...iconProps}
            >
              {badgeProps ? (
                badgeProps._component ? (
                  <badgeProps._component {...badgeProps}>
                    {icon || <InfoIcon fontSize={iconProps?.fontSize || 'default'} />}
                  </badgeProps._component>
                ) : (
                  <Badge {...badgeProps}>
                    {icon || <InfoIcon fontSize={iconProps?.fontSize || 'default'} />}
                  </Badge>
                )
              ) : (
                icon || <InfoIcon fontSize={iconProps?.fontSize || 'default'} />
              )}
            </IconButton>
          </span>
        </Tooltip>
      )}

      <Dialog
        disableBackdropClick={permanent}
        disableEscapeKeyDown={permanent}
        {...dialogueProps}
        open={open}
        onClose={() => {
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
          {children && typeof children === 'function' ? children(() => setOpen(false)) : children}
          {children ? null : <DialogContent {...dialogueContentProps}>{text}</DialogContent>}
        </div>
      </Dialog>
    </span>
  )
}
