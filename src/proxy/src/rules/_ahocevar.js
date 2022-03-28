import { URL } from 'url'
import { normalize } from 'path'
import { AHOCEVAR_ADDRESS } from '../config.js'

const { host, hostname, port, pathname: destinationPathname } = new URL(AHOCEVAR_ADDRESS)

export default (requestDetail, { pathname: originPathname, search }) => {
  return {
    headers: Object.assign(requestDetail.requestOptions.headers, { host }),
    hostname,
    port,
    path: normalize(`${destinationPathname}${originPathname.replace(/\/ahocevar\//, '/')}${search}`)
  }
}
