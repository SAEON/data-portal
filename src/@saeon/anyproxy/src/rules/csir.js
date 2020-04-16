import url from 'url'
import {
  SAEON_ELK_PROXY,
  SAEON_SPATIALDATA_PROXY,
  SAEON_SPATIALDATA_PROXY2,
  HST_ESRI_PROXY,
  CSIR_ESRI_PROXY,
} from '../confg'
import { normalize } from 'path'

const HST_ESRI_PROXY_PARSED = url.parse(HST_ESRI_PROXY)
const CSIR_ESRI_PROXY_PARSED = url.parse(CSIR_ESRI_PROXY)
const SAEON_ELK_PROXY_PARSED = url.parse(SAEON_ELK_PROXY)
const SAEON_SPATIALDATA_PROXY_PARSED = url.parse(SAEON_SPATIALDATA_PROXY)
const SAEON_SPATIALDATA_PROXY2_PARSED = url.parse(SAEON_SPATIALDATA_PROXY2)

const beforeSendRequest = async (req) => {
  const { path } = url.parse(req.url)

  if (path.includes('/csir')) {
    const { protocol, hostname, host, port, path: proxyPath } = CSIR_ESRI_PROXY_PARSED
    req.protocol = protocol
    Object.assign(req.requestOptions, {
      headers: Object.assign(req.requestOptions.headers, { host }),
      hostname,
      port,
      path: normalize(`${proxyPath}${path.replace('/csir', '')}`),
    })
  }

  if (path.includes('/hst')) {
    const { protocol, hostname, host, port, path: proxyPath } = HST_ESRI_PROXY_PARSED
    req.protocol = protocol
    Object.assign(req.requestOptions, {
      headers: Object.assign(req.requestOptions.headers, { host }),
      hostname,
      port,
      path: normalize(`${proxyPath}${path.replace('/hst', '')}`),
    })
  }

  if (path.includes('/saeon-elk')) {
    const { protocol, hostname, port, host, path: proxyPath } = SAEON_ELK_PROXY_PARSED
    req.protocol = protocol
    Object.assign(req.requestOptions, {
      headers: Object.assign(req.requestOptions.headers, { host }),
      hostname,
      port,
      path: normalize(
        `${proxyPath}${path
          .replace('/saeon-elk/_search', '/_search')
          .replace('/saeon-elk', '/_search')}`
      ),
    })
  }

  if (path.includes('/saeon-spatialdata/app01.saeon.ac.za')) {
    const { protocol, hostname, host, path: proxyPath } = SAEON_SPATIALDATA_PROXY_PARSED
    const port = path.match(/^\/saeon-spatialdata\/app01.saeon.ac.za\/\d{4}/)[0].slice(-4)
    req.protocol = protocol
    Object.assign(req.requestOptions, {
      headers: Object.assign(req.requestOptions.headers, { host }),
      hostname,
      port,
      path: normalize(
        `${proxyPath}${path.replace(/\/saeon-spatialdata\/app01.saeon.ac.za\/\d{4}\//, '/')}`
      ),
    })
  }

  if (path.includes('/saeon-spatialdata/196.21.191.55')) {
    const { protocol, hostname, host, proxy: proxyPath } = SAEON_SPATIALDATA_PROXY2_PARSED
    const port = path.match(/^\/saeon-spatialdata\/196\.21\.191\.55\/\d{4}/)[0].slice(-4)
    req.protocol = protocol
    Object.assign(req.requestOptions, {
      headers: Object.assign(req.requestOptions.headers, { host }),
      hostname,
      port,
      path: normalize(
        `${proxyPath}${path.replace(/\/saeon-spatialdata\/196\.21\.191\.55\/\d{4}\//, '/')}`
      ),
    })
  }

  return req
}

const beforeSendResponse = async (req, res) => {}

export default {
  beforeSendRequest,
  beforeSendResponse,
}
