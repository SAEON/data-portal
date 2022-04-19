import 'core-js'
import 'regenerator-runtime'
import 'typeface-roboto'
import '../index.css'
import '../lib/log-config'
if (!window.crypto) window.crypto = window.msCrypto // IE 11
import 'cross-fetch/polyfill' // IE 11
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch' // IE 11
import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import theme from '../theme/mui'
import { ThemeProvider } from '@mui/material/styles'
import Loading from '../components/loading'
import ApolloProvider from '../components/apollo'
import BackgroundImageProvider from '../contexts/background-image'

const App = lazy(() => import('./application'))

export default Page =>
  createRoot(document.getElementById('root')).render(
    <ApolloProvider>
      <ThemeProvider theme={theme}>
        <BackgroundImageProvider>
          <Suspense fallback={<Loading />}>
            <App>
              <Page />
            </App>
          </Suspense>
        </BackgroundImageProvider>
      </ThemeProvider>
    </ApolloProvider>
  )
