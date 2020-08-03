import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AccountCircle as AccountIcon } from '@material-ui/icons'
import { AuthContext } from '../../provider-auth'
import { IconButton, Typography, Menu, Fade, MenuItem } from '@material-ui/core'

export default () => {
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)

  return (
    <AuthContext.Consumer>
      {({ loggedIn, login, logout }) => (
        <>
          {/* USER MENU BUTTON */}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={({ currentTarget }) => setUserMenuAnchor(currentTarget)}
            color="inherit"
            size="small"
          >
            <AccountIcon color={loggedIn ? 'secondary' : 'inherit'} />
          </IconButton>

          {/* USER MENU */}
          <Menu
            id="menu-appbar"
            anchorEl={userMenuAnchor}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(userMenuAnchor)}
            onClose={() => setUserMenuAnchor(null)}
            TransitionComponent={Fade}
          >
            {/* Login */}
            {loggedIn ? null : (
              <MenuItem
                color="inherit"
                onClick={() => {
                  login()
                  setUserMenuAnchor(null)
                }}
                dense={true}
              >
                <Typography variant="overline">Login</Typography>
              </MenuItem>
            )}

            {/* Signup */}
            {loggedIn ? null : (
              <MenuItem
                color="inherit"
                onClick={() => {
                  login()
                  setUserMenuAnchor(null)
                }}
                dense={true}
              >
                <Typography variant="overline">Signup</Typography>
              </MenuItem>
            )}

            {/* Logout */}
            {loggedIn ? (
              <MenuItem
                to="/logout"
                color="inherit"
                component={NavLink}
                dense={true}
                onClick={() => {
                  logout()
                  setUserMenuAnchor(null)
                }}
              >
                <Typography variant="overline">Logout</Typography>
              </MenuItem>
            ) : null}
          </Menu>
        </>
      )}
    </AuthContext.Consumer>
  )
}
