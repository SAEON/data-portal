import dotenv from 'dotenv'
dotenv.config()

// Anyproxy configuration
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8001
export const ENABLE_WEB_INTERFACE =
  process.env.ENABLE_WEB_INTERFACE?.toLowerCase() === 'false' ? false : true
export const WEB_INTERFACE_PORT = process.env.WEB_INTERFACE_PORT
  ? parseInt(process.env.WEB_INTERFACE_PORT, 10)
  : 8002
export const THROTTLE = process.env.THROTTLE ? parseInt(process.env.THROTTLE, 10) : 10000

// User configuration
export const SAEON_SPATIALDATA_PROXY =
  process.env.SAEON_SPATIALDATA_PROXY || 'http://app01.saeon.ac.za'
export const SAEON_SPATIALDATA_PROXY2 =
  process.env.SAEON_SPATIALDATA_PROXY2 || 'http://196.21.191.55'
export const SAEON_ELK_PROXY = process.env.SAEON_ELK_PROXY || 'http://192.168.116.66:9200'
export const CSIR_ESRI_PROXY =
  process.env.CSIR_ESRI_PROXY || 'https://pta-gis-2-web1.csir.co.za/server2/rest/services'
export const HST_ESRI_PROXY =
  process.env.HST_ESRI_PROXY || 'https://gisportal.saeon.ac.za/server/rest/services'
