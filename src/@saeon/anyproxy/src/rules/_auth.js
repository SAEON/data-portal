import url from 'url'
import { normalize } from 'path'
import { IDENTITY_PROXY } from '../config'
const IDENTITY_PROXY_PARSED = url.parse(IDENTITY_PROXY)

export default ({ path, requestDetail }) => {
  const { protocol, hostname, host, port, path: proxyPath } = IDENTITY_PROXY_PARSED
  requestDetail.protocol = protocol
  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(`${proxyPath}${path.replace('/proxy/auth', '')}`),
  }
}
