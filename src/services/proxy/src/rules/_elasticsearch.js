import { URL } from 'url'
import { normalize } from 'path'
import { ELASTICSEARCH_ADDRESS } from '../config.js'
const ELASTICSEARCH_ADDRESS_PARSED = new URL(ELASTICSEARCH_ADDRESS)

export default ({ path, requestDetail }) => {
  const index = path.match(/(?<=\/elasticsearch\/)(.*)$/)[0].replace('/_search', '')
  const { protocol, hostname, port, host, pathname: proxyPath } = ELASTICSEARCH_ADDRESS_PARSED

  requestDetail.protocol = protocol

  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(
      `${proxyPath}${path
        .replace(`/elasticsearch/${index}/_search`, `${index}/_search`)
        .replace(`/elasticsearch/${index}`, `${index}/_search`)}`
    ),
  }
}
