import React from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import {
  DEFAULT_ERROR,
  DEFAULT_WARNING,
  DEFAULT_INFO,
  DEFAULT_SUCCESS,
  LATEST_COMMIT,
} from './config'
import { ApolloProvider } from '@apollo/client'
import ErrorBoundary from './modules/error-boundary'
import ServerLogger from './components/server-logger'
import AuthProvider from './modules/provider-auth'
import FeedbackProvider from './modules/provider-feedback'
import Layout from './modules/layout'
import theme from './theme'
import { debounce } from './lib/fns'
import packageJson from '../package.json'
// import { ConsoleView } from 'react-device-detect'

/*this should probably be an imported function. target has circular references that cause errors when storing target.
This function is to remove circular references. 
Currently it only keeps designated props but later can iterate and remove circular references
returns a simple object but will later return a more appropriate value(e.g. xml)*/
function simplifyTarget(target) {
  const { id, height, width, tagName } = target
  var simpleTarget = { tagName, id, class: target.getAttribute('class'), height, width }
  return simpleTarget
}

export default ({ link }) => (
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
          <FeedbackProvider
            defaultError={DEFAULT_ERROR}
            defaultWarning={DEFAULT_WARNING}
            defaultInfo={DEFAULT_INFO}
            defaultSuccess={DEFAULT_SUCCESS}
          >
            <AuthProvider>
              <ServerLogger
                event={'click'}
                handle={async ({ type, target, x, y }) =>
                  // console.log('target', target)
                  console.logToGraphQL({
                    clientVersion: packageJson.version,
                    type,
                    commitHash: LATEST_COMMIT,
                    createdAt: new Date(),
                    info: {
                      x,
                      y,
                      target: simplifyTarget(target), // TODO - We should store the HTML of the DOM element
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
          </FeedbackProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </CssBaseline>
  </ApolloProvider>
)
