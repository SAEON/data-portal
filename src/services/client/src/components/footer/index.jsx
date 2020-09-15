import React from 'react'
import { AppBar, Typography } from '@material-ui/core'

export default () => {
  return (
    <div style={{ position: 'relative' }}>
      <AppBar
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
        position="relative"
        color="primary"
      >
        <div style={{ margin: 20 }}>
          <Typography variant="overline">© SAEON 2020</Typography>
        </div>
      </AppBar>
    </div>
  )
}
