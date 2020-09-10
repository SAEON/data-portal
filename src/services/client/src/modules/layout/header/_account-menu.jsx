import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AccountCircle as AccountIcon } from '@material-ui/icons'
import { AuthContext } from '../../provider-auth'
import { IconButton, Typography, Menu, MenuItem } from '@material-ui/core'

const ID = 'menu-appbar'

export default ({ style = {} }) => {
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)

  return (
    <AuthContext.Consumer>
      {({ loggedIn, login, logout }) => (
        <div style={style}>
          {/* USER MENU BUTTON */}
          <IconButton
            aria-label="account of current user"
            aria-controls={ID}
            aria-haspopup="true"
            onClick={({ currentTarget }) => setUserMenuAnchor(currentTarget)}
            color="inherit"
            size="small"
          >
            <AccountIcon color={loggedIn ? 'secondary' : 'inherit'} />
          </IconButton>

          {/* USER MENU */}
          <Menu
            id={ID}
            anchorEl={userMenuAnchor}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(userMenuAnchor)}
            onClose={() => setUserMenuAnchor(null)}
          >
            {/* Login */}
            {loggedIn ? null : (
              <MenuItem
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
        </div>
      )}
    </AuthContext.Consumer>
  )
}
