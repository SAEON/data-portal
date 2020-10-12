import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { ApolloProvider } from '@apollo/client'
import ErrorProvider from './contexts/error'
import AuthProvider from './contexts/authentication'
import Layout from './layout'
import theme from './theme'
import { SnackbarProvider } from 'notistack'
import BackgroundImageProvider from './contexts/background-image'
import { NativeExtensions, ApplicationLogger, DefaultApplicationNotices } from './components'
import { GQL_PROVIDER, GQL_SUBSCRIPTIONS_PROVIDER } from './config'
import { HttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'

export default () => {
  return (
    <ErrorProvider>
      <NativeExtensions>
        <BackgroundImageProvider>
          <ApolloProvider
            client={
              new ApolloClient({
                cache: new InMemoryCache(),
                link: split(
                  ({ query }) => {
                    const definition = getMainDefinition(query)
                    return (
                      definition.kind === 'OperationDefinition' &&
                      definition.operation === 'subscription'
                    )
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
                ),
              })
            }
          >
            <ApplicationLogger>
              <CssBaseline>
                <ThemeProvider theme={theme}>
                  <SnackbarProvider>
                    <DefaultApplicationNotices>
                      <AuthProvider>
                        <Layout />
                      </AuthProvider>
                    </DefaultApplicationNotices>
                  </SnackbarProvider>
                </ThemeProvider>
              </CssBaseline>
            </ApplicationLogger>
          </ApolloProvider>
        </BackgroundImageProvider>
      </NativeExtensions>
    </ErrorProvider>
  )
}
