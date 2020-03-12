import React from 'react'
import { Drawer, AppBar, Toolbar, Typography } from '@material-ui/core'

export default ({ active, toggle, children }) => {
  return (
    <Drawer open={active} onClose={toggle}>
      <div style={{ minWidth: 400 }}>
        <AppBar variant="outlined" position="relative">
          <Toolbar disableGutters={true}>
            <div style={{ padding: 20 }}>
              <Typography variant="h6">Menu title</Typography>
            </div>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </Drawer>
  )
}
