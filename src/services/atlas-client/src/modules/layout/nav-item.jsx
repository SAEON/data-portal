import React, { forwardRef } from 'react'
import { Link, Route } from 'react-router-dom'
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'

export default forwardRef(({ label, to, icon, exact = true, href }, ref) => (
  <Route path={to} exact={exact}>
    {({ match }) => {
      return (
        <MenuItem
          innerRef={ref}
          component={href ? 'a' : Link}
          active={match}
          rel={href && 'noopener noreferrer'}
          target={href && '_blank'}
          to={to}
          href={href}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </MenuItem>
      )
    }}
  </Route>
))
