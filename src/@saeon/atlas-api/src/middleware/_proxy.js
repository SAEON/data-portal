import { createProxyMiddleware } from 'http-proxy-middleware'

/**
 * options.target is required even though it's not used
 * https://github.com/chimurai/http-proxy-middleware/issues/416
 */
export default createProxyMiddleware({
  target: 'http://dummytarget.com',
  router: {
    '/proxy/saeon-elk': 'http://192.168.116.66:9200',
    '/proxy/csir': 'https://pta-gis-2-web1.csir.co.za/server2/rest/services',
  },
  changeOrigin: true,
  pathRewrite: {
    '/proxy/saeon-elk/_search': '/_search',
    '/proxy/saeon-elk': '/_search',
    '/proxy/csir': '/',
  },
})
