import { URL } from 'url'
import { normalize } from 'path'
import { CATALOGUE_PROXY_CSIR_ESRI_ADDRESS } from '../config.js'

const {
  protocol,
  hostname,
  host,
  port,
  pathname: destinationPathname,
} = new URL(CATALOGUE_PROXY_CSIR_ESRI_ADDRESS)

export default (requestDetail, { pathname: originPathname, search }) => {
  requestDetail.protocol = protocol

  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(`${destinationPathname}${originPathname.replace('/csir', '')}${search}`),
  }
}
