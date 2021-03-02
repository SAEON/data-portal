import { URL } from 'url'
import { normalize } from 'path'
import { CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS } from '../config.js'
const CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS_PARSED = new URL(
  CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS
)

export default ({ path, requestDetail }) => {
  const {
    protocol,
    hostname,
    host,
    pathname: proxyPath,
  } = CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS_PARSED

  const port = path.match(/^\/saeon-spatialdata\/spatialdata.saeon.ac.za\/\d{4}/)[0].slice(-4)
  requestDetail.protocol = protocol

  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(
      `${proxyPath}${path.replace(/\/saeon-spatialdata\/spatialdata.saeon.ac.za\/\d{4}\//, '/')}`
    ),
  }
}
