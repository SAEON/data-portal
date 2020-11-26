import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AccountIcon from 'mdi-react/AccountCircleIcon'
import { AuthContext } from '../../contexts/authentication'
import { IconButton, Typography, Menu, MenuItem, CircularProgress } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'

const ID = 'menu-appbar'

export default ({ style = {} }) => {
  const theme = useTheme()
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)

  return (
    <AuthContext.Consumer>
      {({ loggedIn, loggingIn, login, logout }) => (
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
            {loggingIn ? (
              <CircularProgress color="inherit" thickness={2} size={18} />
            ) : (
              <AccountIcon
                style={{
                  color: loggedIn ? theme.palette.success.light : theme.palette.common.white,
                }}
              />
            )}
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
