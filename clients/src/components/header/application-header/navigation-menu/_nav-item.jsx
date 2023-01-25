import { Link, useMatch, useLocation } from 'react-router-dom'
import { forwardRef } from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export default forwardRef(({ onClick, label, to, Icon, href }, ref) => {
  const match = useMatch(to)
  const { search } = useLocation()

  return (
    <MenuItem
      ref={ref}
      dense
      disabled={Boolean(match)}
      component={href ? 'a' : Link}
      rel={href && 'noopener noreferrer'}
      target={href && '_blank'}
      onClick={onClick}
      to={`${to || ''}${search}`}
      href={href}
    >
      <ListItemIcon
        sx={{
          color: theme => theme.palette.primary.main,
        }}
      >
        <Icon />
      </ListItemIcon>
      <ListItemText
        sx={{
          color: theme => theme.palette.primary.main,
        }}
        primary={label}
      />
    </MenuItem>
  )
})
