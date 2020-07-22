import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, Menu } from '@material-ui/core'
import {
  Explore as MapIcon,
  Menu as MenuIcon,
  GitHub as GitHubIcon,
  Storage as StorageIcon,
  Info as InfoIcon,
  Home as HomeIcon,
} from '@material-ui/icons'
import NavItem from './nav-item'
import packageJson from '../../../../package.json'
import { SOURCE_CODE_URI } from '../../../config'
import FeedbackDialogue from './_feedback-dialogue'
import AccountMenu from './_account-menu'

export default withRouter(() => {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const closeMenu = () => setMenuAnchor(null)

  return (
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

          {/* Catalogue page */}
          <NavItem label={'Catalogue'} icon={<StorageIcon />} to="/catalogue" />

          {/* Atlas page */}
          <NavItem label={'Atlas'} icon={<MapIcon />} to="/atlas" />

          {/* About page */}
          <NavItem label={'About'} icon={<InfoIcon />} to="/about" />

          {/* Source code link */}
          <NavItem label={'Source Code'} icon={<GitHubIcon />} href={SOURCE_CODE_URI} />
        </Menu>

        {/* Title */}
        <Typography style={{ padding: '10px' }} display="block" variant="body2">
          SAEON DATA PORTAL v{packageJson.version}
        </Typography>

        {/* TOP-RIGHT ICON CONTROLS */}
        <div style={{ marginLeft: 'auto' }}>
          <FeedbackDialogue />
          <AccountMenu />
        </div>
      </Toolbar>
    </AppBar>
  )
})
