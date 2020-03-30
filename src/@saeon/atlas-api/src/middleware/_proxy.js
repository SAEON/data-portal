import { createProxyMiddleware } from 'http-proxy-middleware'

/**
 * options.target is required even though it's not used
 * https://github.com/chimurai/http-proxy-middleware/issues/416
 */
export default createProxyMiddleware({
  target: 'http://dummytarget.com',
  router: ({ path }) => {
    let target
    if (path.includes('/proxy/saeon-elk')) {
      target = 'http://192.168.116.66:9200'
    }

    if (path.includes('/proxy/saeon-spatialdata')) {
      const port = path.match(/^\/proxy\/saeon-spatialdata\/\d{4}/)[0].slice(-4)
      target = `http://app01.saeon.ac.za:${port}`
    }

    if (path.includes('/proxy/csir')) {
      target = 'https://pta-gis-2-web1.csir.co.za/server2/rest/services'
    }

    console.log('Proxy target configured', path, target)
    return target
  },
  changeOrigin: true,
  pathRewrite: (path) => {
    const newPath = path
      .replace('/proxy/saeon-elk/_search', '/_search')
      .replace('/proxy/saeon-elk', '/_search')
      .replace('/proxy/csir', '')
      .replace(/\/proxy\/saeon-spatialdata\/\d{4}\//, '/')
    console.log('Proxy path configured', path, newPath)
    return newPath
  },
})
