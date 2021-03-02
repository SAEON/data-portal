import { URL } from 'url'
import { normalize } from 'path'
import { CATALOGUE_PROXY_CSIR_ESRI_ADDRESS } from '../config.js'
const CATALOGUE_PROXY_CSIR_ESRI_ADDRESS_PARSED = new URL(CATALOGUE_PROXY_CSIR_ESRI_ADDRESS)

export default ({ path, requestDetail }) => {
  const {
    protocol,
    hostname,
    host,
    port,
    pathname: proxyPath,
  } = CATALOGUE_PROXY_CSIR_ESRI_ADDRESS_PARSED

  requestDetail.protocol = protocol

  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(`${proxyPath}${path.replace('/csir', '')}`),
  }
}
