import { ProxyServer } from 'anyproxy'
import options from './options'
import console from './lib/console'

const proxy = new ProxyServer(options)

proxy.on('ready', () => {
  console.log(`anyproxy ready on port ${options.port}`)
  console.log(`anyproxy interface ready on port ${options.webInterface.webPort}`)
})

proxy.on('error', (e) => {
  console.error('anyproxy error', e)
})

proxy.start()

// proxy.close() // Not sure why I would want to call this?
