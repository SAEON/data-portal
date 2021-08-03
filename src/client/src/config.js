import packageJson from '../package.json'

export const CATALOGUE_LATEST_COMMIT = process.env.CATALOGUE_LATEST_COMMIT || ''

export const CATALOGUE_CLIENT_BACKGROUNDS = process.env.CATALOGUE_CLIENT_BACKGROUNDS || ''

export const CATALOGUE_DEPLOYMENT_ENV = process.env.CATALOGUE_DEPLOYMENT_ENV || 'development'

export const CATALOGUE_CLIENT_DEFAULT_NOTICES = process.env.CATALOGUE_CLIENT_DEFAULT_NOTICES || '' // "msg,info;msg2,warn;msg3,error;etd"

export const CATALOGUE_SOURCE_CODE_URI =
  process.env.CATALOGUE_SOURCE_CODE_URI || 'https://github.com/SAEON/catalogue'

export const CATALOGUE_CURATOR_CONTACT =
  process.env.CATALOGUE_CURATOR_CONTACT || 'curation@saeon.ac.za'

export const CATALOGUE_LEGAL_CONTACT = process.env.CATALOGUE_LEGAL_CONTACT || ''

export const CATALOGUE_TECHNICAL_CONTACT =
  process.env.CATALOGUE_TECHNICAL_CONTACT || 'zach@saeon.ac.za'

export const CATALOGUE_CLIENT_MAX_ATLAS_LAYERS = 1000
export const CATALOGUE_CLIENT_MAX_DATABOOK_TABLES = 50

export const CATALOGUE_API_ADDRESS = process.env.CATALOGUE_API_ADDRESS || 'http://localhost:3000'

export const CATALOGUE_CLIENT_PROXY_ADDRESS =
  process.env.CATALOGUE_CLIENT_PROXY_ADDRESS || 'http://localhost:8001'

export const CATALOGUE_API_GQL_ADDRESS = `${CATALOGUE_API_ADDRESS}/graphql`

const url = new URL(CATALOGUE_API_ADDRESS)
export const CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS = `${
  url.protocol === 'http:' ? 'ws:' : 'wss:'
}//${url.hostname}${url.port ? `:${url.port}` : ''}/graphql`

export const CATALOGUE_CLIENT_ADDRESS =
  process.env.CATALOGUE_CLIENT_ADDRESS || 'http://localhost:3001'

export const CATALOGUE_CLIENT_FILTER_CONFIG = JSON.parse(process.env.CATALOGUE_CLIENT_FILTER_CONFIG)

export const PACKAGE_DESCRIPTION = process.env.PACKAGE_DESCRIPTION.toString()

export const CATALOGUE_SUPPORTED_DATABOOK_FORMATS = process.env
  .CATALOGUE_SUPPORTED_DATABOOK_FORMATS || ['SHAPEFILE', 'NETCDF']

export const PACKAGE_KEYWORDS = process.env.PACKAGE_KEYWORDS.toString().split(',')

export const TITLE = `SAEON DATA PORTAL ${
  CATALOGUE_DEPLOYMENT_ENV === 'production'
    ? ''
    : `${CATALOGUE_DEPLOYMENT_ENV}.${packageJson.version}`
}`
