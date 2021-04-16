import 'core-js'
import 'regenerator-runtime'
import 'typeface-roboto'
import './index.scss'
import './lib/log-config'
import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import Loading from './components/loading'
if (!window.crypto) window.crypto = window.msCrypto // IE 11
import 'cross-fetch/polyfill' // IE 11
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch' // IE 11

const App = lazy(() => import('./app'))

render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>,
  document.getElementById('root')
)

/**
 * TODO
 *
 * Figure out how this works:
 * Worker defined in webpack.config.js (Google Workbox)
 */
if ('serviceWorker' in navigator) {
  // window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'))

  // Uninstall all service workers
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister()
    }
  })
}
