import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'typeface-roboto'
import './index.scss'
import { configure as configureLogger } from '@saeon/logger'
import logToHttp from '@saeon/logger/log-to-http'
import logToGraphQL from '@saeon/logger/log-to-graphql'
import React from 'react'
import { render } from 'react-dom'
import { ApolloClient, HttpLink, InMemoryCache, split, gql } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'
import theme from './theme'
import { GQL_PROVIDER, GQL_SUBSCRIPTIONS_PROVIDER, ATLAS_API_ADDRESS } from './config'
import Application from './app'
import { nativeExtensions } from './lib/fns'
nativeExtensions()

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  new WebSocketLink({
    uri: GQL_SUBSCRIPTIONS_PROVIDER,
    options: {
      reconnect: true,
    },
  }),
  new HttpLink({
    uri: GQL_PROVIDER,
  })
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

render(<Application theme={theme} client={client} />, document.getElementById('root'))

// // Worker defined in webpack.config.js (Google Workbox)
// if (process.env.NODE_ENV === 'production')
//   if ('serviceWorker' in navigator)
//     window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'))
