import 'core-js'
import 'regenerator-runtime'
import 'typeface-roboto'
import '../index.css'
import '../lib/log-config'
if (!window.crypto) window.crypto = window.msCrypto // IE 11
import 'cross-fetch/polyfill' // IE 11
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch' // IE 11
import { createRoot } from 'react-dom/client'

export default Page => createRoot(document.getElementById('root')).render(<Page />)

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
