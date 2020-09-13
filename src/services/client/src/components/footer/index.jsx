import React from 'react'
import { AppBar, Typography } from '@material-ui/core'
import { HEADLESS_PAGES } from '../../config'

export default () => {
  // eslint-disable-next-line no-useless-escape
  const currentRoute = window.location.pathname.match(/[^\/]*\/[^\/]*/)[0]

  return HEADLESS_PAGES.includes(currentRoute) ? null : (
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
