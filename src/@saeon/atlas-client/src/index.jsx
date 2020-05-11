import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'typeface-roboto'
import './index.scss'
import { configure as configureLogger } from '@saeon/logger'
import logToHttp from '@saeon/logger/log-to-http'
import logToGraphQL from '@saeon/logger/log-to-graphql'
import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, split, gql } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import {
  DEFAULT_ERROR,
  DEFAULT_WARNING,
  DEFAULT_INFO,
  DEFAULT_SUCCESS,
  GQL_PROVIDER,
  GQL_SUBSCRIPTIONS_PROVIDER,
  ATLAS_API_ADDRESS,
} from './config'

// Material UI theme
import theme from './theme'

// Global wrappers
import ErrorBoundary from './modules/error-boundary'

// Global providers
import MapProvider from './modules/provider-map'
import { MenuProvider } from '@saeon/snap-menus'
import FeedbackProvider from './modules/provider-feedback'

// Pages
import Layout from './modules/layout'
import Atlas from './modules/page-atlas'
import AboutPage from './modules/page-about'
import Search from './modules/page-search'
import SearchResults from './modules/page-search-results'

// Some helpers
import { nativeExtensions } from './lib/fns'
nativeExtensions()

// HTTP link (queries / mutations)
const httpLink = new HttpLink({
  uri: GQL_PROVIDER,
})

// WSS link (subscriptions)
const wsLink = new WebSocketLink({
  uri: GQL_SUBSCRIPTIONS_PROVIDER,
  options: {
    reconnect: true,
  },
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

// Configure Apollo GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

// Configure server logs for client usage tracking
configureLogger(() => ({
  overwrites: {
    logToHttp: logToHttp(ATLAS_API_ADDRESS),
    logToGraphQL: logToGraphQL({
      link,
      query: gql`
        mutation logBrowserEvents($input: [BrowserEventInput]!) {
          logBrowserEvents(input: $input)
        }
      `,
    }),
  },
}))

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
                  <Route
                    key={'Search'}
                    path={'/search'}
                    exact={true}
                    render={() => (
                      <MenuProvider>
                        <Search />
                      </MenuProvider>
                    )}
                  />
                  <Route
                    key={'Search-results'}
                    path={'/search-results'}
                    exact={true}
                    render={() => <SearchResults />}
                  />
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
