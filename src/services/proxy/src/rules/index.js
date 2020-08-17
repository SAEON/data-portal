import url from 'url'
import csirRule from './_csir.js'
import hstRule from './_hst.js'
import elasticsearch from './_elasticsearch.js'
import saeonGeoServer1 from './_saeon-geoserver-1.js'
import saeonGeoServer2 from './_saeon-geoserver-2.js'

const beforeSendRequest = async requestDetail => {
  const { path } = url.parse(requestDetail.url)

  try {
    let proxiedRequest
    if (path.includes('/proxy/csir')) {
      proxiedRequest = csirRule({ path, requestDetail })
    } else if (path.includes('/proxy/hst')) {
      proxiedRequest = hstRule({ path, requestDetail })
    } else if (path.includes('/proxy/elasticsearch')) {
      proxiedRequest = elasticsearch({ path, requestDetail })
    } else if (path.includes('/proxy/saeon-spatialdata/app01.saeon.ac.za')) {
      proxiedRequest = saeonGeoServer1({ path, requestDetail })
    } else if (path.includes('/proxy/saeon-spatialdata/196.21.191.55')) {
      proxiedRequest = saeonGeoServer2({ path, requestDetail })
    } else {
      throw new Error('No rule found')
    }

    // Check if this request is cached
    // If so, send it

    Object.assign(requestDetail.requestOptions, proxiedRequest)
    return requestDetail
  } catch (error) {
    return {
      response: {
        statusCode: 404,
        header: { 'Content-Type': 'application/json' },
        body: `{"ERROR": "Unable to proxy request to ${requestDetail.url}". ${error}}`,
      },
    }
  }
}

// eslint-disable-next-line no-unused-vars
const beforeSendResponse = async (requestDetail, responseDetail) => {
  // Update cache with response
}

export default {
  beforeSendRequest,
  beforeSendResponse,
}
