import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'typeface-roboto'
import './index.scss'
import { configure as configureLogger } from '@saeon/logger'
import logToGraphQL from '@saeon/logger/log-to-graphql'
import React from 'react'
import { render } from 'react-dom'
import { HttpLink, split, gql } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'
import Application from './app'
import { nativeExtensions } from './lib/fns'
import { GQL_PROVIDER, GQL_SUBSCRIPTIONS_PROVIDER, BACKGROUNDS } from './config'
import { SnackbarProvider } from 'notistack'

// Some helpful functions
nativeExtensions()

// Configure Apollo link
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
    credentials: 'include',
  })
)

// Configure server logs for client usage tracking
configureLogger(() => ({
  overwrites: {
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

const getBackgroundImagePath = () => {
  const backgrounds = BACKGROUNDS.split(',')
  const min = 0
  const max = backgrounds.length - 1
  const i = Math.floor(Math.random() * (max - min + 1) + min)
  return `url(/bg/${backgrounds[i]})`
}

render(
  <>
    <div
      id="bg"
      style={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundSize: 'cover',
        backgroundImage: getBackgroundImagePath(),
        zIndex: -1,
      }}
    />
    <SnackbarProvider maxSnack={5}>
      <Application link={link} />
    </SnackbarProvider>
  </>,
  document.getElementById('root')
)

// Worker defined in webpack.config.js (Google Workbox)
if ('serviceWorker' in navigator) {
  // window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'))

  // Uninstall all service workers
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister()
    }
  })
}
