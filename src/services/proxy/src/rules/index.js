import url from 'url'
import csirRule from './_csir.js'
import hstRule from './_hst.js'
import elasticsearchRule from './_elasticsearch.js'
import saeonGeoServersRule from './_saeon-geoservers.js'
import saeonGeoServerApp04Rule from './_saeon-geoserver-app04.js'

const beforeSendRequest = async requestDetail => {
  const { path } = url.parse(requestDetail.url)

  try {
    let proxiedRequest

    if (path.includes('/proxy/csir')) {
      proxiedRequest = csirRule({ path, requestDetail })
    } else if (path.includes('/proxy/hst')) {
      proxiedRequest = hstRule({ path, requestDetail })
    } else if (path.includes('/proxy/elasticsearch')) {
      proxiedRequest = elasticsearchRule({ path, requestDetail })
    } else if (path.includes('/proxy/saeon-spatialdata/spatialdata.saeon.ac.za')) {
      proxiedRequest = saeonGeoServersRule({ path, requestDetail })
    } else if (path.includes('/proxy/saeon-spatialdata/geoserver.saeon.ac.za')) {
      proxiedRequest = saeonGeoServerApp04Rule({ path, requestDetail })
    } else {
      throw new Error('No rule found')
    }

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
