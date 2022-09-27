import 'core-js'
import 'regenerator-runtime'
import 'typeface-roboto'
import '../index.css'
import '../lib/log-config'
if (!window.crypto) window.crypto = window.msCrypto // IE 11
import 'cross-fetch/polyfill' // IE 11
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch' // IE 11
import { createRoot } from 'react-dom/client'
import theme from '../theme/mui'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import ApolloProvider from '../components/apollo'
import BackgroundImageProvider from '../contexts/background-image'

export default Page =>
  createRoot(document.getElementById('root')).render(
    <ApolloProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <BackgroundImageProvider>
            <Page />
          </BackgroundImageProvider>
        </CssBaseline>
      </ThemeProvider>
    </ApolloProvider>
  )
