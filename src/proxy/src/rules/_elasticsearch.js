import { URL } from 'url'
import { normalize } from 'path'
import { ELASTICSEARCH_ADDRESS } from '../config.js'

const {
  protocol,
  hostname,
  port,
  host,
  pathname: destinationPathname,
} = new URL(ELASTICSEARCH_ADDRESS)

export default (requestDetail, { pathname: originPathname, search }) => {
  const index = originPathname.match(/(?<=\/elasticsearch\/)(.*)$/)[0].replace('/_search', '')
  requestDetail.protocol = protocol

  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(
      `${destinationPathname}${originPathname
        .replace(`/elasticsearch/${index}/_search`, `${index}/_search${search}`)
        .replace(`/elasticsearch/${index}`, `${index}/_search`)}${search}`
    ),
  }
}
