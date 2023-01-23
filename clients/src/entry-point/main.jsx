import 'core-js'
import 'regenerator-runtime'
import 'typeface-roboto'
import '../index.css'
import '../lib/log-config'
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
