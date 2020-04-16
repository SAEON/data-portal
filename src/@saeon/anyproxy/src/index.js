import AnyProxy from 'anyproxy'
import options from './options'

const proxyServer = new AnyProxy.ProxyServer(options)

proxyServer.on('ready', () => {
  console.log(
    `anyproxy ready on port ${options.port}`,
    `anyrpxy interface ready on port ${options.webInterface.webPort}`
  )
})

proxyServer.on('error', (e) => {
  console.error('anyproxy error', e)
})

proxyServer.start()
