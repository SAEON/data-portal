import CssBaseline from '@material-ui/core/CssBaseline'
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import ApolloProvider from './components/apollo-provider'
import GlobalProvider from './contexts/global'
import AuthorizationProvider from './contexts/authorization'
import AuthenticationProvider from './contexts/authentication'
import Layout from './layout'
import theme from './theme'
import { SnackbarProvider } from 'notistack'
import BackgroundImageProvider from './contexts/background-image'
import NativeExtensions from './components/native-extensions'
import ApplicationLogger from './components/application-logger'
import DefaultApplicationNotices from './components/default-application-notices'
import ErrorBoundary from './components/error-boundary'
import DetectDevice from './components/detect-device'

export default () => {
  return (
    <ErrorBoundary>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <DetectDevice>
            <NativeExtensions>
              <ApolloProvider>
                <GlobalProvider>
                  <BackgroundImageProvider>
                    <ApplicationLogger>
                      <AuthenticationProvider>
                        <AuthorizationProvider>
                          <SnackbarProvider>
                            <DefaultApplicationNotices>
                              <Layout />
                            </DefaultApplicationNotices>
                          </SnackbarProvider>
                        </AuthorizationProvider>
                      </AuthenticationProvider>
                    </ApplicationLogger>
                  </BackgroundImageProvider>
                </GlobalProvider>
              </ApolloProvider>
            </NativeExtensions>
          </DetectDevice>
        </ThemeProvider>
      </CssBaseline>
    </ErrorBoundary>
  )
}
