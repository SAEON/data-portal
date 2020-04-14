import { createProxyMiddleware } from 'http-proxy-middleware'
import {
  SAEON_SPATIALDATA_PROXY,
  SAEON_ELK_PROXY,
  CSIR_ARCGIS_PROXY,
  SAEON_SPATIALDATA_PROXY2,
} from '../config'

/**
 * options.target is required even though it's not used
 * https://github.com/chimurai/http-proxy-middleware/issues/416
 */
export default createProxyMiddleware({
  target: 'http://dummytarget.com',
  router: ({ path }) => {
    let target
    if (path.includes('/proxy/saeon-elk')) {
      target = SAEON_ELK_PROXY
    }

    if (path.includes('/proxy/saeon-spatialdata/196.21.191.55')) {
      const port = path.match(/^\/proxy\/saeon-spatialdata\/196\.21\.191\.55\/\d{4}/)[0].slice(-4)
      target = `${SAEON_SPATIALDATA_PROXY2}:${port}`
    }

    if (path.includes('/proxy/saeon-spatialdata/app01.saeon.ac.za')) {
      const port = path.match(/^\/proxy\/saeon-spatialdata\/app01.saeon.ac.za\/\d{4}/)[0].slice(-4)
      target = `${SAEON_SPATIALDATA_PROXY}:${port}`
    }

    if (path.includes('/proxy/csir')) {
      target = CSIR_ARCGIS_PROXY
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
      .replace(/\/proxy\/saeon-spatialdata\/196\.21\.191\.55\/\d{4}\//, '/')
      .replace(/\/proxy\/saeon-spatialdata\/app01.saeon.ac.za\/\d{4}\//, '/')
    console.log('Proxy path configured', path, newPath)
    return newPath
  },
})
