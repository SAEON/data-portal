import React, { useState } from 'react'
import { Switch, withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, Menu, Fade, MenuItem } from '@material-ui/core'
import {
  Explore as MapIcon,
  Menu as MenuIcon,
  GitHub as GitHubIcon,
  Info as InfoIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  List as ListIcon,
  AccountCircle as AccountIcon,
} from '@material-ui/icons'
import NavItem from './nav-item'
import packageJson from '../../../package.json'
import { SOURCE_CODE_URI } from '../../config'
import useStyles from './style'
import { AuthContext } from '../provider-auth'

const Layout = ({ children }) => {
  const classes = useStyles()
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [userMenuAnchor, setUserMenuAnchor] = useState(null)
  const closeMenu = () => setMenuAnchor(null)

  return (
    <>
      <AppBar variant="outlined" position="static">
        <Toolbar disableGutters={false} variant="dense">
          <IconButton
            onClick={e => setMenuAnchor(e.currentTarget)}
            style={{ padding: 0 }}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={closeMenu}
            onClick={closeMenu}
          >
            {/* Home page */}
            <NavItem label={'Home'} icon={<HomeIcon />} to="/" />

            {/* Atlas page */}
            <NavItem label={'Atlas'} icon={<MapIcon />} to="/atlas" />

            {/* About page */}
            <NavItem label={'About'} icon={<InfoIcon />} to="/about" />

            {/* Source code link */}
            <NavItem label={'Source Code'} icon={<GitHubIcon />} href={SOURCE_CODE_URI} />
          </Menu>

          {/* Title */}
          <Typography style={{ padding: '10px' }} display="block" variant="body2">
            SAEON Atlas {packageJson.version}
          </Typography>

          {/* User account */}
          <AuthContext.Consumer>
            {({ loggedIn, login, logout }) => (
              <div style={{ marginLeft: 'auto' }}>
                {/* Icon */}
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={({ currentTarget }) => setUserMenuAnchor(currentTarget)}
                  color="inherit"
                  size="small"
                >
                  <AccountIcon
                    color={
                      // eslint-disable-next-line no-constant-condition
                      loggedIn ? 'secondary' : 'inherit'
                    }
                  />
                </IconButton>

                {/* User profile menu */}
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
                      className={classes.link}
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
                      className={classes.link}
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
                      className={classes.link}
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
              </div>
            )}
          </AuthContext.Consumer>
        </Toolbar>
      </AppBar>

      {/* Application routes */}
      <Switch key={location.pathname || '/'}>{children}</Switch>

      {/* Footer */}
      <AppBar variant="outlined" position="fixed" style={{ bottom: 0, top: 'auto', zIndex: 1 }}>
        <Toolbar style={{ justifyContent: 'center', minHeight: '24px' }} disableGutters={false}>
          <Typography variant="caption">&copy; SAEON 2020</Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default withRouter(Layout)
