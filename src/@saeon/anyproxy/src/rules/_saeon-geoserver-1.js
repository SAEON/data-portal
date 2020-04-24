import url from 'url'
import { normalize } from 'path'
import { SAEON_SPATIALDATA_PROXY } from '../config'
const SAEON_SPATIALDATA_PROXY_PARSED = url.parse(SAEON_SPATIALDATA_PROXY)

export default ({ path, requestDetail }) => {
  const { protocol, hostname, host, path: proxyPath } = SAEON_SPATIALDATA_PROXY_PARSED
  const port = path.match(/^\/saeon-spatialdata\/app01.saeon.ac.za\/\d{4}/)[0].slice(-4)
  requestDetail.protocol = protocol
  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(
      `${proxyPath}${path.replace(/\/saeon-spatialdata\/app01.saeon.ac.za\/\d{4}\//, '/')}`
    ),
  }
}
