import 'typeface-roboto'
import './index.scss'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { render } from 'react-dom'
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'

// Material UI theme
import theme from './theme'

// Global wrappers
import ErrorBoundary from './modules/error-boundary'

// Global providers
import MapProvider from './modules/provider-map'
import MenuProvider from './modules/provider-menu'
import FeedbackProvider from './modules/provider-feedback'

// Pages
import Layout from './modules/layout'
import Atlas from './modules/page-atlas'
import AboutPage from './modules/page-about'

// Some helpers
import { nativeExtensions } from './lib/fns'
nativeExtensions()

const Application = () => (
  <CssBaseline>
    <ThemeProvider theme={createMuiTheme(theme)}>
      <ErrorBoundary>
        <FeedbackProvider>
          <MapProvider>
            <Router>
              <Layout>
                <Route
                  key={'home'}
                  path={'/'}
                  exact={true}
                  render={() => (
                    <MenuProvider>
                      <Atlas />
                    </MenuProvider>
                  )}
                />
                <Route key={'about'} path={'/about'} exact={true} render={() => <AboutPage />} />
              </Layout>
            </Router>
          </MapProvider>
        </FeedbackProvider>
      </ErrorBoundary>
    </ThemeProvider>
  </CssBaseline>
)

render(<Application />, document.getElementById('root'))
