import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { LATEST_COMMIT, DEFAULT_NOTICES } from './config'
import { ApolloProvider } from '@apollo/client'
import ErrorBoundary from './modules/error-boundary'
import ServerLogger from './components/server-logger'
import AuthProvider from './modules/provider-auth'
import Layout from './modules/layout'
import theme from './theme'
import { debounce } from './lib/fns'
import packageJson from '../package.json'
import { useSnackbar } from 'notistack'

export default ({ link }) => {
  const { enqueueSnackbar } = useSnackbar()
  const notices = DEFAULT_NOTICES.split(';')
    .filter(_ => _)
    .map(str => {
      const [msg, variant] = str.split(',').map(s => s.trim())
      return {
        msg,
        variant,
      }
    })

  notices.forEach(({ msg, variant }) =>
    enqueueSnackbar(msg, {
      variant,
    })
  )

  return (
    <ApolloProvider
      client={
        new ApolloClient({
          cache: new InMemoryCache(),
          link,
        })
      }
    >
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <AuthProvider>
              <ServerLogger
                event={'click'}
                handle={async ({ type, target, x, y }) =>
                  console.logToGraphQL({
                    clientVersion: packageJson.version,
                    type,
                    commitHash: LATEST_COMMIT,
                    createdAt: new Date(),
                    info: {
                      x,
                      y,
                      target, // TODO - We should store the HTML of the DOM element
                    },
                  })
                }
              >
                <ServerLogger
                  event={'mousemove'}
                  handle={debounce(async ({ type, x, y }) =>
                    console.logToGraphQL({
                      clientVersion: packageJson.version,
                      type,
                      commitHash: LATEST_COMMIT,
                      createdAt: new Date(),
                      info: {
                        x,
                        y,
                      },
                    })
                  )}
                >
                  <Layout />
                </ServerLogger>
              </ServerLogger>
            </AuthProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </CssBaseline>
    </ApolloProvider>
  )
}
