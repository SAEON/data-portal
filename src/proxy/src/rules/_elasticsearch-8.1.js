import { URL } from 'url'
import { normalize } from 'path'
import {
  ELASTICSEARCH_8_1_ADDRESS as ELASTICSEARCH_ADDRESS,
  ALLOWED_ES_INDICES,
} from '../config.js'

const {
  protocol,
  hostname,
  port,
  host,
  pathname: destinationPathname,
} = new URL(ELASTICSEARCH_ADDRESS)

export default (requestDetail, { pathname: originPathname, search }) => {
  requestDetail.protocol = protocol

  const index = originPathname.match(/(?<=\/elasticsearch\/8.1\/)(.*)$/)[0].replace('/_search', '')
  if (!ALLOWED_ES_INDICES.includes(index)) {
    throw new Error(`The index "${index}" is not configured as publicly searchable`)
  }

  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(
      `${destinationPathname}${originPathname
        .replace(`/elasticsearch/8.1/${index}/_search`, `${index}/_search${search}`)
        .replace(`/elasticsearch/8.1/${index}`, `${index}/_search`)}${search}`
    ),
  }
}
