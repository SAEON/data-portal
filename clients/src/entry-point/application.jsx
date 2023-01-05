import SearchProvider from '../contexts/search'
import ReferrerProvider from '../contexts/referrer'
import ClientInfoProvider from '../contexts/client-info'
import AuthorizationProvider from '../contexts/authorization'
import AuthenticationProvider from '../contexts/authentication'
import { SnackbarProvider } from 'notistack'
import NativeExtensions from '../components/native-extensions'
import ApplicationLogger, { LogAppRender } from '../components/application-logger'
import DefaultApplicationNotices from '../components/default-application-notices'
import ErrorBoundary from '../components/error-boundary'
import DetectDevice from '../components/detect-device'
import CookieConsent from '../components/cookie-consent'
import LayoutProvider from '../contexts/layout'
import ConfigProvider from '../config'
import { BrowserRouter as Router } from 'react-router-dom'

export default ({ children, ...config }) => {
  return (
    <Router>
      <ConfigProvider contentBase={config.contentBase || '/'}>
        <ErrorBoundary>
          <DetectDevice>
            <NativeExtensions>
              <ClientInfoProvider>
                <CookieConsent>
                  <AuthenticationProvider>
                    <AuthorizationProvider>
                      <ReferrerProvider>
                        <SearchProvider>
                          <ApplicationLogger>
                            <LogAppRender>
                              <SnackbarProvider>
                                <DefaultApplicationNotices>
                                  <LayoutProvider>{children}</LayoutProvider>
                                </DefaultApplicationNotices>
                              </SnackbarProvider>
                            </LogAppRender>
                          </ApplicationLogger>
                        </SearchProvider>
                      </ReferrerProvider>
                    </AuthorizationProvider>
                  </AuthenticationProvider>
                </CookieConsent>
              </ClientInfoProvider>
            </NativeExtensions>
          </DetectDevice>
        </ErrorBoundary>
      </ConfigProvider>
    </Router>
  )
}
