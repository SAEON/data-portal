import { ApolloClient, InMemoryCache } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { ApolloProvider } from '@apollo/client'
import GlobalProvider from './contexts/global'
import AuthProvider from './contexts/authentication'
import Layout from './layout'
import theme from './theme'
import { SnackbarProvider } from 'notistack'
import BackgroundImageProvider from './contexts/background-image'
import {
  NativeExtensions,
  ApplicationLogger,
  DefaultApplicationNotices,
  ErrorBoundary,
} from './components'
import { GQL_PROVIDER, GQL_SUBSCRIPTIONS_PROVIDER } from './config'
import { HttpLink, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'

export default () => {
  return (
    <NativeExtensions>
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
        <CssBaseline>
          <ThemeProvider theme={theme}>
            <ErrorBoundary>
              <GlobalProvider>
                <BackgroundImageProvider>
                  <ApplicationLogger>
                    <SnackbarProvider>
                      <DefaultApplicationNotices>
                        <AuthProvider>
                          <Layout />
                        </AuthProvider>
                      </DefaultApplicationNotices>
                    </SnackbarProvider>
                  </ApplicationLogger>
                </BackgroundImageProvider>
              </GlobalProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </CssBaseline>
      </ApolloProvider>
    </NativeExtensions>
  )
}
