import url from 'url'
import { normalize } from 'path'
import { HST_ESRI_PROXY } from '../confg'
const HST_ESRI_PROXY_PARSED = url.parse(HST_ESRI_PROXY)

export default ({ path, requestDetail }) => {
  if (path.includes('/hst')) {
    const { protocol, hostname, host, port, path: proxyPath } = HST_ESRI_PROXY_PARSED
    requestDetail.protocol = protocol
    Object.assign(requestDetail.requestOptions, {
      headers: Object.assign(requestDetail.requestOptions.headers, { host }),
      hostname,
      port,
      path: normalize(`${proxyPath}${path.replace('/hst', '')}`),
    })
  }
}
