import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import { InformationVariant } from '../icons'

const IconButtonType = ({
  disabled,
  ariaLabel,
  id,
  setOpen,
  open,
  badgeProps,
  icon,
  ...iconProps
}) => {
  return (
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
      size="medium"
    >
      {badgeProps ? (
        badgeProps._component ? (
          <badgeProps._component {...badgeProps}>
            {icon || <InformationVariant fontSize="small" />}
          </badgeProps._component>
        ) : (
          <Badge {...badgeProps}>{icon || <InformationVariant fontSize="small" />}</Badge>
        )
      ) : (
        icon || <InformationVariant fontSize="small" />
      )}
    </IconButton>
  )
}

const NormalButtonType = ({ disabled, ariaLabel, id, setOpen, open, ...buttonProps }) => {
  return (
    <Button
      disabled={disabled}
      aria-label={ariaLabel}
      aria-controls={id}
      aria-haspopup="true"
      aria-expanded={open}
      onClick={e => {
        e.stopPropagation()
        setOpen(!open)
      }}
      {...buttonProps}
    />
  )
}

export default ({ buttonType, badgeProps, ...props }) => {
  if (buttonType === 'icon') {
    return <IconButtonType badgeProps={badgeProps} {...props} />
  }

  return <NormalButtonType {...props} />
}
