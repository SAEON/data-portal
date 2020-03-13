import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap } from '../../lib/ol'
import { Menu as MenuIcon } from '@material-ui/icons'
import AppLayout from './_app-layout'

export default () => {
  const [menuAnchor, setMenuAnchor] = useState(null)
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
            SAEON Atlas
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ height: 'calc(100% - 42px)', width: '100%' }}>
        <OlReact
          viewOptions={{
            center: [32, -15],
            zoom: 4.6
          }}
          layers={[terrestrisBaseMap()]}
          style={{ width: '100%', height: '100%' }}
        >
          {({ map }) => <MapProxy map={map}>{({ proxy }) => <AppLayout proxy={proxy} />}</MapProxy>}
        </OlReact>
      </div>
    </>
  )
}
