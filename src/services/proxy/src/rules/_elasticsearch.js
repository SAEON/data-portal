import url from 'url'
import { normalize } from 'path'
import { ELASTICSEARCH_PROXY } from '../config.js'
const ELASTICSEARCH_PROXY_PARSED = url.parse(ELASTICSEARCH_PROXY)

export default ({ path, requestDetail }) => {
  const index = path.match(/(?<=\/elasticsearch\/)(.*)$/)[0].replace('/_search', '')
  const { protocol, hostname, port, host, path: proxyPath } = ELASTICSEARCH_PROXY_PARSED
  requestDetail.protocol = protocol
  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(
      `${proxyPath}${path
        .replace(`/proxy/elasticsearch/${index}/_search`, `${index}/_search`)
        .replace(`/proxy/elasticsearch/${index}`, `${index}/_search`)}`
    ),
  }
}
