import 'typeface-roboto'
import './index.scss'
import React from 'react'
import { render } from 'react-dom'
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'
import Layout from './layout'
import themeConfig from './theme'

const theme = createMuiTheme(themeConfig)

const App = () => (
  <CssBaseline>
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  </CssBaseline>
)

render(<App />, document.getElementById('root'))
