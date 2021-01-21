import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import ApolloProvider from './components/apollo-provider'
import GlobalProvider from './contexts/global'
import AuthProvider from './contexts/authentication'
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
                      <AuthProvider>
                        <SnackbarProvider>
                          <DefaultApplicationNotices>
                            <Layout />
                          </DefaultApplicationNotices>
                        </SnackbarProvider>
                      </AuthProvider>
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
