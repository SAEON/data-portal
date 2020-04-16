import { HTTP_PROXY } from '../config'
import { createProxyServer } from 'http-proxy'

const proxy = createProxyServer({
  changeOrigin: true,
})

export default (req, res, next) => {
  if (HTTP_PROXY) {
    proxy.proxyRequest(req, res, {
      target: HTTP_PROXY,
    })
    proxy.on('error', (error) => {
      console.warn('Proxy error', req.path, error.code)
    })
  } else {
    next()
  }
}
