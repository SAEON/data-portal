import packageJson from '../package.json'

export const LATEST_COMMIT = process.env.LATEST_COMMIT || ''

export const CATALOGUE_CLIENT_BACKGROUNDS = process.env.CATALOGUE_CLIENT_BACKGROUNDS || ''

export const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV || 'development'

export const CATALOGUE_CLIENT_DEFAULT_NOTICES = process.env.CATALOGUE_CLIENT_DEFAULT_NOTICES || '' // "msg,info;msg2,warn;msg3,error;etd"

export const CATALOGUE_SOURCE_CODE_URI =
  process.env.CATALOGUE_SOURCE_CODE_URI || 'https://github.com/SAEON/catalogue'

export const CURATOR_CONTACT = process.env.CURATOR_CONTACT || 'curation@saeon.ac.za'

export const CATALOGUE_LEGAL_CONTACT = process.env.CATALOGUE_LEGAL_CONTACT || ''

export const CATALOGUE_TECHNICAL_CONTACT =
  process.env.CATALOGUE_TECHNICAL_CONTACT || 'zach@saeon.ac.za'

export const CATALOGUE_CLIENT_MAX_ATLAS_LAYERS = 1000
export const CATALOGUE_CLIENT_MAX_DATABOOK_TABLES = 50

export const API_PUBLIC_ADDRESS = process.env.API_PUBLIC_ADDRESS || 'http://localhost:3000'

export const CATALOGUE_CLIENT_PROXY_ADDRESS =
  process.env.CATALOGUE_CLIENT_PROXY_ADDRESS || 'http://localhost:8001'

export const PUBLIC_GQL_ADDRESS = `${API_PUBLIC_ADDRESS}/graphql`

const url = new URL(API_PUBLIC_ADDRESS)
export const CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS = `${
  url.protocol === 'http:' ? 'ws:' : 'wss:'
}//${url.hostname}${url.port ? `:${url.port}` : ''}/graphql`

export const CATALOGUE_CLIENT_ADDRESS =
  process.env.CATALOGUE_CLIENT_ADDRESS || 'http://localhost:3001'

export const CATALOGUE_CLIENT_FILTER_CONFIG = JSON.parse(process.env.CATALOGUE_CLIENT_FILTER_CONFIG)

export const PACKAGE_DESCRIPTION = process.env.PACKAGE_DESCRIPTION.toString()

export const CATALOGUE_SUPPORTED_DATABOOK_FORMATS = process.env
  .CATALOGUE_SUPPORTED_DATABOOK_FORMATS || ['SHAPEFILE', 'NETCDF', 'ASC']

export const PACKAGE_KEYWORDS = process.env.PACKAGE_KEYWORDS.toString().split(',')

export const TITLE = `SAEON DATA PORTAL ${
  DEPLOYMENT_ENV === 'production' ? '' : `${DEPLOYMENT_ENV}.${packageJson.version}`
}`
