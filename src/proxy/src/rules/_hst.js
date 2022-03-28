import { URL } from 'url'
import { normalize } from 'path'
import { CATALOGUE_PROXY_HST_ESRI_PROXY } from '../config.js'

const { protocol, hostname, host, port, pathname: destinationPath } = new URL(
  CATALOGUE_PROXY_HST_ESRI_PROXY
)

export default (requestDetail, { pathname: originPathname, search }) => {
  requestDetail.protocol = protocol

  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(`${destinationPath}${originPathname.replace('/hst', '')}${search}`)
  }
}
