import url from 'url'
import { normalize } from 'path'
import { SAEON_SPATIALDATA_PROXY2 } from '../config'
const SAEON_SPATIALDATA_PROXY2_PARSED = url.parse(SAEON_SPATIALDATA_PROXY2)

export default ({ path, requestDetail }) => {
  const { protocol, hostname, host, path: proxyPath } = SAEON_SPATIALDATA_PROXY2_PARSED
  const port = path.match(/^\/proxy\/saeon-spatialdata\/196\.21\.191\.55\/\d{4}/)[0].slice(-4)
  requestDetail.protocol = protocol
  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(
      `${proxyPath}${path.replace(/\/proxy\/saeon-spatialdata\/196\.21\.191\.55\/\d{4}\//, '/')}`
    ),
  }
}
