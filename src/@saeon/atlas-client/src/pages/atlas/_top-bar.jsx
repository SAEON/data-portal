import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import { Menu as MenuIcon, GitHub as GitHubIcon } from '@material-ui/icons'
import packageJson from '../../../package.json'

export default () => {
  const [menuAnchor, setMenuAnchor] = useState(null)
  return (
    <AppBar variant="outlined" position="static">
      <Toolbar disableGutters={false} className="thin-toolbar">
        <IconButton
          onClick={(e) => setMenuAnchor(e.currentTarget)}
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
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem onClick={() => alert('hi')}>Not</MenuItem>
          <MenuItem onClick={() => alert('hi')}>sure</MenuItem>
          <MenuItem onClick={() => alert('hi')}>if</MenuItem>
          <MenuItem onClick={() => alert('hi')}>this</MenuItem>
          <MenuItem onClick={() => alert('hi')}>is</MenuItem>
          <MenuItem onClick={() => alert('hi')}>needed</MenuItem>
        </Menu>
        <Typography style={{ padding: '10px' }} display="block" variant="body2">
          {packageJson.name} v{packageJson.version}
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
  )
}
