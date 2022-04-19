import dotenv from 'dotenv'
dotenv.config()

export const AHOCEVAR_ADDRESS = 'https://ahocevar.com'

export const CATALOGUE_PROXY_CSIR_ESRI_ADDRESS =
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services'

export const CATALOGUE_PROXY_ENABLE_WEB_INTERFACE = true

export const CATALOGUE_PROXY_HST_ESRI_PROXY = 'https://gisportal.saeon.ac.za/server/rest/services'

export const CATALOGUE_PROXY_PORT = 8001

export const CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS = 'https://spatialdata.saeon.ac.za'

export const CATALOGUE_PROXY_SAEON_SPATIALDATA_ADDRESS_APP04 = 'http://geoserver.saeon.ac.za'

export const CATALOGUE_PROXY_THROTTLE = 10000

export const CATALOGUE_PROXY_WEB_INTERFACE_PORT = 8002

export const ELASTICSEARCH_NEXT_ADDRESS =
  process.env.ELASTICSEARCH_NEXT_ADDRESS || 'http://localhost:9200'
export const ELASTICSEARCH_7_14_ADDRESS =
  process.env.ELASTICSEARCH_7_14_ADDRESS || 'http://localhost:9200'
export const ELASTICSEARCH_8_1_ADDRESS =
  process.env.ELASTICSEARCH_8_1_ADDRESS || 'http://localhost:9200'

export const TERRESTRIS_ADDRESS = 'https://ows.terrestris.de'

export const ALLOWED_ES_INDICES = [
  'saeon-odp-search',
  'saeon-odp-catalogue-search',
  'nccis-qgis-index',
]
