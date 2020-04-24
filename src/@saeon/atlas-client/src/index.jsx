import 'typeface-roboto'
import './index.scss'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client'
import { CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core'
import {
  DEFAULT_ERROR,
  DEFAULT_WARNING,
  DEFAULT_INFO,
  DEFAULT_SUCCESS,
  GQL_PROVIDER,
} from './config'

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

// Configure Apollo GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: GQL_PROVIDER,
  }),
})

const Application = () => (
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
  </ApolloProvider>
)

render(<Application />, document.getElementById('root'))
