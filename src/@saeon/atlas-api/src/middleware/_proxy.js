import { createProxyMiddleware } from 'http-proxy-middleware'

/**
 * options.target is required even though it's not used
 * https://github.com/chimurai/http-proxy-middleware/issues/416
 */
export default createProxyMiddleware({
  target: 'http://dummytarget.com',
  router: ({ path }) => {
    if (path.includes('/proxy/saeon-elk')) {
      return 'http://192.168.116.66:9200'
    } else if (path.includes('/proxy/saeon-spatialdata')) {
      return `http://app01.saeon.ac.za:${path
        .match(/^\/proxy\/saeon-spatialdata\/\d{4}/)[0]
        .slice(-4)}`
    } else if (path.includes('/proxy/csir')) {
      return 'https://pta-gis-2-web1.csir.co.za/server2/rest/services'
    }
  },
  changeOrigin: true,
  pathRewrite: (path) =>
    path
      .replace('proxy/saeon-elk/_search', '/_search')
      .replace('proxy/saeon-elk', '/_search')
      .replace('proxy/csir', '/')
      .replace(/proxy\/saeon-spatialdata\/\d{4}/, '/'),
})
