import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'typeface-roboto'
import './index.scss'
import React from 'react'
import { render } from 'react-dom'
import Application from './app'

render(<Application />, document.getElementById('root'))

// Worker defined in webpack.config.js (Google Workbox)
if ('serviceWorker' in navigator) {
  // window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'))

  // Uninstall all service workers
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister()
    }
  })
}
