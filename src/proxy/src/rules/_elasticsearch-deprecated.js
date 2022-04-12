/**
 * This is deprecated. Don't use.
 * Feel free to delete this (and force
 * Marc Pienaar to update his QGIS plugin)
 */

import { URL } from 'url'
import { normalize } from 'path'
import { ELASTICSEARCH_7_14_ADDRESS as ELASTICSEARCH_ADDRESS } from '../config.js'

const { protocol, hostname, port, host, pathname: destinationPathname } = new URL(
  ELASTICSEARCH_ADDRESS
)

export default (requestDetail, { pathname: originPathname, search }) => {
  requestDetail.protocol = protocol

  const index = originPathname.match(/(?<=\/elasticsearch\/)(.*)$/)[0].replace('/_search', '')

  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(
      `${destinationPathname}${originPathname
        .replace(`/elasticsearch/${index}/_search`, `nccis-qgis-index/_search${search}`)
        .replace(`/elasticsearch/${index}`, `nccis-qgis-index/_search`)}${search}`
    )
  }
}
