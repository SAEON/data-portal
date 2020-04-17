import url from 'url'
import { normalize } from 'path'
import { SAEON_ELK_PROXY } from '../config'
const SAEON_ELK_PROXY_PARSED = url.parse(SAEON_ELK_PROXY)

export default ({ path, requestDetail }) => {
  if (path.includes('/saeon-elk')) {
    const { protocol, hostname, port, host, path: proxyPath } = SAEON_ELK_PROXY_PARSED
    requestDetail.protocol = protocol
    Object.assign(requestDetail.requestOptions, {
      headers: Object.assign(requestDetail.requestOptions.headers, { host }),
      hostname,
      port,
      path: normalize(
        `${proxyPath}${path
          .replace('/saeon-elk/_search', '/_search')
          .replace('/saeon-elk', '/_search')}`
      ),
    })
  }
}
