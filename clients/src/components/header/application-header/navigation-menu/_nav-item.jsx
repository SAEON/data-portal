import { Link, useMatch } from 'react-router-dom'
import { forwardRef } from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export default forwardRef(({ onClick, label, to, Icon, href }, ref) => {
  const match = useMatch(to)

  return (
    <MenuItem
      ref={ref}
      dense
      disabled={Boolean(match)}
      component={href ? 'a' : Link}
      rel={href && 'noopener noreferrer'}
      target={href && '_blank'}
      onClick={onClick}
      to={to || ''}
      href={href}
    >
      <ListItemIcon
        sx={{
          color: theme => (match ? theme.palette.primary.dark : theme.palette.primary.main),
        }}
      >
        <Icon />
      </ListItemIcon>
      <ListItemText
        sx={{
          color: theme => (match ? theme.palette.primary.dark : theme.palette.primary.main),
        }}
        primary={label}
      />
    </MenuItem>
  )
})
