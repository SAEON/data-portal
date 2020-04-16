import url from 'url'
import { normalize } from 'path'
import { SAEON_SPATIALDATA_PROXY, SAEON_SPATIALDATA_PROXY2 } from '../confg'
const SAEON_SPATIALDATA_PROXY_PARSED = url.parse(SAEON_SPATIALDATA_PROXY)
const SAEON_SPATIALDATA_PROXY2_PARSED = url.parse(SAEON_SPATIALDATA_PROXY2)

export default ({ path, requestDetail }) => {
  if (path.includes('/saeon-spatialdata/app01.saeon.ac.za')) {
    const { protocol, hostname, host, path: proxyPath } = SAEON_SPATIALDATA_PROXY_PARSED
    const port = path.match(/^\/saeon-spatialdata\/app01.saeon.ac.za\/\d{4}/)[0].slice(-4)
    requestDetail.protocol = protocol
    Object.assign(requestDetail.requestOptions, {
      headers: Object.assign(requestDetail.requestOptions.headers, { host }),
      hostname,
      port,
      path: normalize(
        `${proxyPath}${path.replace(/\/saeon-spatialdata\/app01.saeon.ac.za\/\d{4}\//, '/')}`
      ),
    })
  }

  if (path.includes('/saeon-spatialdata/196.21.191.55')) {
    const { protocol, hostname, host, proxy: proxyPath } = SAEON_SPATIALDATA_PROXY2_PARSED
    const port = path.match(/^\/saeon-spatialdata\/196\.21\.191\.55\/\d{4}/)[0].slice(-4)
    requestDetail.protocol = protocol
    Object.assign(requestDetail.requestOptions, {
      headers: Object.assign(requestDetail.requestOptions.headers, { host }),
      hostname,
      port,
      path: normalize(
        `${proxyPath}${path.replace(/\/saeon-spatialdata\/196\.21\.191\.55\/\d{4}\//, '/')}`
      ),
    })
  }
}
