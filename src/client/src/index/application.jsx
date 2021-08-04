import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import Apollo from '../components/apollo'
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
import LayoutProvider from '../contexts/layout'

export default ({ children, ...config }) => {
  return (
    <Router>
      <CssBaseline>
        <ThemeProvider theme={theme}>
          <ErrorBoundary>
            <DetectDevice>
              <NativeExtensions>
                <Apollo>
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
                </Apollo>
              </NativeExtensions>
            </DetectDevice>
          </ErrorBoundary>
        </ThemeProvider>
      </CssBaseline>
    </Router>
  )
}
