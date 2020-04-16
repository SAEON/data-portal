import url from 'url'
import { normalize } from 'path'
import { CSIR_ESRI_PROXY } from '../config'
const CSIR_ESRI_PROXY_PARSED = url.parse(CSIR_ESRI_PROXY)

export default ({ path, requestDetail }) => {
  if (path.includes('/csir')) {
    const { protocol, hostname, host, port, path: proxyPath } = CSIR_ESRI_PROXY_PARSED
    requestDetail.protocol = protocol
    Object.assign(requestDetail.requestOptions, {
      headers: Object.assign(requestDetail.requestOptions.headers, { host }),
      hostname,
      port,
      path: normalize(`${proxyPath}${path.replace('/csir', '')}`),
    })
  }
}
