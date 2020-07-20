import React from 'react'

import { AppBar, Toolbar, Typography } from '@material-ui/core'

export default () => (
  <AppBar variant="outlined" position="fixed" style={{ bottom: 0, top: 'auto' }}>
    <Toolbar style={{ justifyContent: 'center', minHeight: '24px' }} disableGutters={false}>
      <Typography variant="caption">&copy; SAEON 2020</Typography>
    </Toolbar>
  </AppBar>
)
