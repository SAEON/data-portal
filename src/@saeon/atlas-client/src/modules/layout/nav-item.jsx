import React from 'react'
import { Link, Route } from 'react-router-dom'
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'

export default ({ label, to, icon, exact = true, href }) => (
  <Route path={to} exact={exact}>
    {({ match }) => (
      <MenuItem
        component={href ? 'a' : Link}
        active={match && !href}
        rel={href && 'noopener noreferrer'}
        target={href && '_blank'}
        to={to}
        href={href}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </MenuItem>
    )}
  </Route>
)
