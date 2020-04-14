import { config } from 'dotenv'
config()

export const PORT = process.env.PORT ?? 3000
export const NODE_ENV = process.env.NODE_ENV ?? 'development'

export const SAEON_SPATIALDATA_PROXY =
  process.env.SAEON_SPATIALDATA_PROXY ?? 'http://app01.saeon.ac.za'

export const SAEON_SPATIALDATA_PROXY2 =
  process.env.SAEON_SPATIALDATA_PROXY2 ?? 'http://196.21.191.55'

export const SAEON_ELK_PROXY = process.env.SAEON_ELK_PROXY ?? 'http://192.168.116.66:9200'

export const CSIR_ARCGIS_PROXY =
  process.env.CSIR_ARCGIS_PROXY ?? 'https://pta-gis-2-web1.csir.co.za/server2/rest/services'

export const ALLOWED_ORIGINS =
  process.env.ALLOWED_ORIGINS ?? 'http://localhost:3000,http://localhost:3001'
