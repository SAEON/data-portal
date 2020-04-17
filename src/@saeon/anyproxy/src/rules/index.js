import url from 'url'
import csirRule from './_csir'
import hstRule from './_hst'
import saeonElk from './_saeon-elk'
import saeonGeoServers from './_saeon-geoservers'

const beforeSendRequest = async (requestDetail) => {
  const { path } = url.parse(requestDetail.url)
  csirRule({ path, requestDetail })
  hstRule({ path, requestDetail })
  saeonElk({ path, requestDetail })
  saeonGeoServers({ path, requestDetail })
  return requestDetail
}

// eslint-disable-next-line no-unused-vars
const beforeSendResponse = async (requestDetail, responseDetail) => {}

export default {
  beforeSendRequest,
  beforeSendResponse,
}
