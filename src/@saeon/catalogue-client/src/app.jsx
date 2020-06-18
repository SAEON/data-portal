import React from 'react'
import { CssBaseline, Typography } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

export default ({ theme }) => (
  <CssBaseline>
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Typography>Hello world</Typography>
    </ThemeProvider>
  </CssBaseline>
)
