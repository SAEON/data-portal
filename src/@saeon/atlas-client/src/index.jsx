import 'typeface-roboto'
import './index.scss'
import React from 'react'
import { render } from 'react-dom'
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'
import Atlas from './pages/atlas'
import MapProvider from './modules/map-provider'
import MenuProvider from './modules/menu-provider'
import FeedbackProvider from './modules/feedback-provider'
import ExceptionProvider from './modules/exception-provider'
import theme from './theme'
import { nativeExtensions } from './lib/fns'
nativeExtensions()

render(
  <CssBaseline>
    <ThemeProvider theme={createMuiTheme(theme)}>
      <ExceptionProvider>
        <FeedbackProvider>
          <MapProvider>
            <MenuProvider>
              <Atlas />
            </MenuProvider>
          </MapProvider>
        </FeedbackProvider>
      </ExceptionProvider>
    </ThemeProvider>
  </CssBaseline>,
  document.getElementById('root')
)
