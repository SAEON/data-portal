import { lazy, Suspense } from 'react'
import Loading from './components/loading'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'typeface-roboto'
import './index.scss'
import { render } from 'react-dom'

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
