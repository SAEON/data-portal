import 'typeface-roboto'
import './index.scss'
import React from 'react'
import { render } from 'react-dom'
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'
import Layout from './modules/layout'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00796b'
    },
    secondary: {
      main: '#607d8b'
    }
  },
  status: {
    danger: 'orange'
  }
})

const App = () => (
  <CssBaseline>
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>
  </CssBaseline>
)

render(<App />, document.getElementById('root'))
