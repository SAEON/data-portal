import url from 'url'
import csirRule from './_csir'
import hstRule from './_hst'
import saeonElk from './_saeon-elk'
import saeonGeoServers from './_saeon-geoservers'

/**
 * Only GET requests are cached. Otherwise just proxy requests
 * @param {Object} requestDetail Node.js request object
 */
const beforeSendRequest = async (requestDetail) => {
  const { path } = url.parse(requestDetail.url)
  csirRule({ path, requestDetail })
  hstRule({ path, requestDetail })
  saeonElk({ path, requestDetail })
  saeonGeoServers({ path, requestDetail })
  return requestDetail
}

export default {
  beforeSendRequest,
}
