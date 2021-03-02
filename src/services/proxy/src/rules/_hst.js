import { URL } from 'url'
import { normalize } from 'path'
import { CATALOGUE_PROXY_HST_ESRI_PROXY } from '../config.js'
const CATALOGUE_PROXY_HST_ESRI_PROXY_PARSED = new URL(CATALOGUE_PROXY_HST_ESRI_PROXY)

export default ({ path, requestDetail }) => {
  const {
    protocol,
    hostname,
    host,
    port,
    pathname: proxyPath,
  } = CATALOGUE_PROXY_HST_ESRI_PROXY_PARSED

  requestDetail.protocol = protocol

  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(`${proxyPath}${path.replace('/hst', '')}`),
  }
}
