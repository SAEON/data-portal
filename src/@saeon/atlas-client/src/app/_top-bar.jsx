import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import { Menu as MenuIcon, GitHub as GitHubIcon } from '@material-ui/icons'
import { MenuContext } from '../modules/menu-provider'

export default () => (
  <MenuContext.Consumer>
    {({ updateMenuManager, ...fields }) => (
      <AppBar variant="outlined" position="static">
        <Toolbar disableGutters={false} className="thin-toolbar">
          <IconButton
            onClick={e => updateMenuManager({ topMenu: { menuAnchor: e.currentTarget } })}
            style={{ padding: 0 }}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={fields.topMenu.menuAnchor}
            keepMounted
            open={Boolean(fields.topMenu.menuAnchor)}
            onClose={() => updateMenuManager({ topMenu: { menuAnchor: null } })}
          >
            <MenuItem onClick={() => alert('hi')}>Not</MenuItem>
            <MenuItem onClick={() => alert('hi')}>sure</MenuItem>
            <MenuItem onClick={() => alert('hi')}>if</MenuItem>
            <MenuItem onClick={() => alert('hi')}>this</MenuItem>
            <MenuItem onClick={() => alert('hi')}>is</MenuItem>
            <MenuItem onClick={() => alert('hi')}>needed</MenuItem>
          </Menu>
          <Typography style={{ padding: '10px' }} display="block" variant="body2">
            SAEON Atlas
          </Typography>

          <IconButton
            onClick={() =>
              window.open(
                'https://github.com/SAEONData/saeon-atlas/tree/master/src/%40saeon/atlas-client'
              )
            }
            style={{ marginLeft: 'auto' }}
            color="inherit"
            size="small"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    )}
  </MenuContext.Consumer>
)
