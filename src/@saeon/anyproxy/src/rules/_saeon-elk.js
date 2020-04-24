import url from 'url'
import { normalize } from 'path'
import { SAEON_ELK_PROXY } from '../config'
const SAEON_ELK_PROXY_PARSED = url.parse(SAEON_ELK_PROXY)

export default ({ path, requestDetail }) => {
  const index = path.match(/(?<=\/saeon-elk\/)(.*)$/)[0].replace('/_search', '')
  const { protocol, hostname, port, host, path: proxyPath } = SAEON_ELK_PROXY_PARSED
  requestDetail.protocol = protocol
  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(
      `${proxyPath}${path
        .replace(`/saeon-elk/${index}/_search`, `${index}/_search`)
        .replace(`/saeon-elk/${index}`, `${index}/_search`)}`
    ),
  }
}
