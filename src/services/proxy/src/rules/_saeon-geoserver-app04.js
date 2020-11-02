import url from 'url'
import { normalize } from 'path'
import { CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS_APP04 } from '../config.js'
const CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS_APP04_PARSED = url.parse(
  CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS_APP04
)

export default ({ path, requestDetail }) => {
  const {
    protocol,
    hostname,
    host,
    path: proxyPath,
  } = CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS_APP04_PARSED
  const port = path.match(/^\/proxy\/saeon-spatialdata\/196.21.191.55\/\d{4}/)[0].slice(-4)
  requestDetail.protocol = protocol
  console.log(requestDetail.protocol)
  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(
      `${proxyPath}${path.replace(/\/proxy\/saeon-spatialdata\/196.21.191.55\/\d{4}\//, '/')}`
    ),
  }
}
