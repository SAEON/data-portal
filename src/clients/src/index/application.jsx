import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import ApolloProvider from '../components/apollo'
import GlobalProvider from '../contexts/global'
import ClientInfoProvider from '../contexts/client-info'
import AuthorizationProvider from '../contexts/authorization'
import AuthenticationProvider from '../contexts/authentication'
import theme from '../theme'
import { SnackbarProvider } from 'notistack'
import BackgroundImageProvider from '../contexts/background-image'
import NativeExtensions from '../components/native-extensions'
import ApplicationLogger from '../components/application-logger'
import DefaultApplicationNotices from '../components/default-application-notices'
import ErrorBoundary from '../components/error-boundary'
import DetectDevice from '../components/detect-device'
import CookieConsent from '../components/cookie-consent'
import { BrowserRouter as Router } from 'react-router-dom'
import DynamicConfigProvider from '../config'
import LayoutProvider from '../contexts/layout'

export default ({ children, ...config }) => {
  return (
    <DynamicConfigProvider contentBase={config.contentBase || '/'}>
      <Router>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <ErrorBoundary>
                <DetectDevice>
                  <NativeExtensions>
                    <ApolloProvider>
                      <ClientInfoProvider>
                        <CookieConsent>
                          <AuthenticationProvider>
                            <AuthorizationProvider>
                              <GlobalProvider>
                                <BackgroundImageProvider {...config}>
                                  <ApplicationLogger>
                                    <SnackbarProvider>
                                      <DefaultApplicationNotices>
                                        <LayoutProvider>{children}</LayoutProvider>
                                      </DefaultApplicationNotices>
                                    </SnackbarProvider>
                                  </ApplicationLogger>
                                </BackgroundImageProvider>
                              </GlobalProvider>
                            </AuthorizationProvider>
                          </AuthenticationProvider>
                        </CookieConsent>
                      </ClientInfoProvider>
                    </ApolloProvider>
                  </NativeExtensions>
                </DetectDevice>
              </ErrorBoundary>
            </CssBaseline>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </DynamicConfigProvider>
  )
}
