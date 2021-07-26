import dotenv from 'dotenv'
dotenv.config()

export const CATALOGUE_LATEST_COMMIT = process.env.CATALOGUE_LATEST_COMMIT || undefined

export const CATALOGUE_PROXY_PORT = process.env.CATALOGUE_PROXY_PORT
  ? parseInt(process.env.CATALOGUE_PROXY_PORT, 10)
  : 8001

export const CATALOGUE_PROXY_ENABLE_WEB_INTERFACE =
  process.env.CATALOGUE_PROXY_ENABLE_WEB_INTERFACE?.toLowerCase() === 'false' ? false : true

export const CATALOGUE_PROXY_WEB_INTERFACE_PORT = process.env.CATALOGUE_PROXY_WEB_INTERFACE_PORT
  ? parseInt(process.env.CATALOGUE_PROXY_WEB_INTERFACE_PORT, 10)
  : 8002

export const CATALOGUE_PROXY_THROTTLE = process.env.CATALOGUE_PROXY_THROTTLE
  ? parseInt(process.env.CATALOGUE_PROXY_THROTTLE, 10)
  : 10000

export const AHOCEVAR_ADDRESS = 'https://ahocevar.com'

export const TERRESTRIS_ADDRESS = 'https://ows.terrestris.de'

export const ELASTICSEARCH_ADDRESS = process.env.ELASTICSEARCH_ADDRESS || 'http://localhost:9200'

export const CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS = 'https://spatialdata.saeon.ac.za'

export const CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS_APP04 = 'http://geoserver.saeon.ac.za'

export const CATALOGUE_PROXY_CSIR_ESRI_ADDRESS =
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services'

export const CATALOGUE_PROXY_HST_ESRI_PROXY = 'https://gisportal.saeon.ac.za/server/rest/services'

console.log('Configuration', {
  ELASTICSEARCH_ADDRESS,
  CATALOGUE_LATEST_COMMIT,
  CATALOGUE_PROXY_PORT,
  CATALOGUE_PROXY_ENABLE_WEB_INTERFACE,
  CATALOGUE_PROXY_WEB_INTERFACE_PORT,
  CATALOGUE_PROXY_THROTTLE,
  CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS,
  CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS_APP04,
  CATALOGUE_PROXY_CSIR_ESRI_ADDRESS,
  CATALOGUE_PROXY_HST_ESRI_PROXY,
})
