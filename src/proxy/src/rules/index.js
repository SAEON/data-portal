import { URL } from 'url'
import csirRule from './_csir.js'
import hstRule from './_hst.js'
import elasticsearchRule from './_elasticsearch.js'
import elasticsearch714Rule from './_elasticsearch-7.14.js'
import saeonGeoServersRule from './_saeon-geoservers.js'
import saeonGeoServerApp04Rule from './_saeon-geoserver-app04.js'
import saeonGeoServerApp04Rule2 from './_saeon-geoserver-app04-2.js'
import corsRule from './_cors.js'
import ahocevarRule from './_ahocevar.js'
import terrestrisRule from './_terrestris.js'

const beforeSendRequest = async requestDetail => {
  const url = new URL(requestDetail.url)
  const { pathname } = url

  try {
    let proxiedRequest
    if (pathname.includes('/csir')) {
      proxiedRequest = csirRule(requestDetail, url)
    } else if (pathname.includes('/hst')) {
      proxiedRequest = hstRule(requestDetail, url)
    } else if (pathname.includes('/elasticsearch/7.14')) {
      proxiedRequest = elasticsearch714Rule(requestDetail, url)
    } else if (pathname.includes('/elasticsearch')) {
      proxiedRequest = elasticsearchRule(requestDetail, url)
    } else if (pathname.includes('/saeon-spatialdata/spatialdata.saeon.ac.za')) {
      proxiedRequest = saeonGeoServersRule(requestDetail, url)
    } else if (pathname.includes('/saeon-spatialdata/geoserver.saeon.ac.za')) {
      proxiedRequest = saeonGeoServerApp04Rule(requestDetail, url)
    } else if (pathname.includes('/saeon-spatialdata/app04.saeon.ac.za')) {
      proxiedRequest = saeonGeoServerApp04Rule2(requestDetail, url)
    } else if (pathname.includes('/ahocevar')) {
      proxiedRequest = ahocevarRule(requestDetail, url)
    } else if (pathname.includes('/terrestris')) {
      proxiedRequest = terrestrisRule(requestDetail, url)
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

const beforeSendResponse = async (requestDetail, responseDetail) => {
  return corsRule(requestDetail, responseDetail)
}

export default {
  beforeSendRequest,
  beforeSendResponse,
}
