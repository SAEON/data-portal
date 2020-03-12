import React from 'react'
import { Drawer, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { Close as CloseButton } from '@material-ui/icons'

export default ({ active, toggle, title, children, width }) => {
  return (
    <Drawer variant="persistent" open={active} onClose={toggle}>
      <div style={{ width: width || 400 }}>
        <AppBar variant="outlined" color="secondary" position="relative">
          {title ? (
            <Toolbar disableGutters={true}>
              <div style={{ padding: 20, width: '100%' }}>
                <Typography variant="overline">{title}</Typography>
                <IconButton
                  onClick={() => toggle({ active: false })}
                  color="inherit"
                  edge="end"
                  style={{ float: 'right', order: 2, marginLeft: 'auto', padding: '0 2px' }}
                  aria-label="close"
                >
                  <CloseButton />
                </IconButton>
              </div>
            </Toolbar>
          ) : null}
        </AppBar>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </Drawer>
  )
}
