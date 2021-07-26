import { URL } from 'url'
import { normalize } from 'path'
import { CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS } from '../config.js'

const {
  protocol,
  hostname,
  host,
  pathname: destinationPathname,
} = new URL(CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS)

export default (requestDetail, { pathname: originPathname, search }) => {
  requestDetail.protocol = protocol

  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port: originPathname.match(/^\/saeon-spatialdata\/spatialdata.saeon.ac.za\/\d{4}/)[0].slice(-4),
    path: normalize(
      `${destinationPathname}${originPathname.replace(
        /\/saeon-spatialdata\/spatialdata.saeon.ac.za\/\d{4}\//,
        '/'
      )}${search}`
    ),
  }
}
