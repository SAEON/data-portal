import React from 'react'
import { CssBaseline, Typography } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import packageJson from '../package.json'

export default ({ theme }) => (
  <CssBaseline>
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Typography>
        {packageJson.name} v{packageJson.version}: {packageJson.description}
      </Typography>
    </ThemeProvider>
  </CssBaseline>
)
