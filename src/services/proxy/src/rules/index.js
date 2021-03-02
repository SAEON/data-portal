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

    if (path.includes('/csir')) {
      proxiedRequest = csirRule({ path, requestDetail })
    } else if (path.includes('/hst')) {
      proxiedRequest = hstRule({ path, requestDetail })
    } else if (path.includes('/elasticsearch')) {
      proxiedRequest = elasticsearchRule({ path, requestDetail })
    } else if (path.includes('/saeon-spatialdata/spatialdata.saeon.ac.za')) {
      proxiedRequest = saeonGeoServersRule({ path, requestDetail })
    } else if (path.includes('/saeon-spatialdata/geoserver.saeon.ac.za')) {
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
  Object.assign(responseDetail.response.header, {
    'Access-Control-Allow-Origin': 'http://localhost:3001',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers':
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, credentials, Authorization',
  })

  if (requestDetail.requestOptions.method === 'OPTIONS') {
    return {
      response: {
        statusCode: 200,
      },
    }
  }
}

export default {
  beforeSendRequest,
  beforeSendResponse,
}
