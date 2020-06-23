import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { EventBoundary } from './components'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { DEFAULT_ERROR, DEFAULT_WARNING, DEFAULT_INFO, DEFAULT_SUCCESS } from './config'
import { ApolloProvider } from '@apollo/client'

// Global wrappers
import ErrorBoundary from './modules/error-boundary'

// Global providers
import AuthProvider from './modules/provider-auth'
import MapProvider from './modules/provider-map'
import FeedbackProvider from './modules/provider-feedback'
import MenuProvider from '../../../packages/snap-menus/src/provider'

// Pages
import Layout from './modules/layout'
import Atlas from './modules/page-atlas'
import AboutPage from './modules/page-about'

export default ({ client, theme }) => (
  <EventBoundary>
    <ApolloProvider client={client}>
      <CssBaseline>
        <ThemeProvider theme={createMuiTheme(theme)}>
          <ErrorBoundary>
            <FeedbackProvider
              defaultError={DEFAULT_ERROR}
              defaultWarning={DEFAULT_WARNING}
              defaultInfo={DEFAULT_INFO}
              defaultSuccess={DEFAULT_SUCCESS}
            >
              <AuthProvider>
                <MapProvider>
                  <MenuProvider
                    VERTICAL_OFFSET_TOP={55}
                    HORIZONTAL_MARGIN={5}
                    VERTICAL_OFFSET_BOTTOM={30}
                  >
                    <Router>
                      <Layout>
                        <Route
                          key={'authenticated'}
                          path={'/authenticated'}
                          exact={true}
                          render={() => <Redirect to={'/'} />}
                        />
                        <Route key={'home'} path={'/'} exact={true} render={() => <Atlas />} />
                        <Route
                          key={'about'}
                          path={'/about'}
                          exact={true}
                          render={() => <AboutPage />}
                        />
                      </Layout>
                    </Router>
                  </MenuProvider>
                </MapProvider>
              </AuthProvider>
            </FeedbackProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </CssBaseline>
    </ApolloProvider>
  </EventBoundary>
)
