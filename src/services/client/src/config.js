export const CATALOGUE_LATEST_COMMIT = process.env.CATALOGUE_LATEST_COMMIT || ''

export const CATALOGUE_CLIENT_BACKGROUNDS = process.env.CATALOGUE_CLIENT_BACKGROUNDS || ''

export const CATALOGUE_DEPLOYMENT_ENV = process.env.CATALOGUE_DEPLOYMENT_ENV || 'local'

export const CATALOGUE_CLIENT_DEFAULT_NOTICES = process.env.CATALOGUE_CLIENT_DEFAULT_NOTICES || '' // "msg,info;msg2,warn;msg3,error;etd"

export const CATALOGUE_SOURCE_CODE_URI =
  process.env.CATALOGUE_SOURCE_CODE_URI || 'https://github.com/SAEONData/catalogue'

export const CATALOGUE_DISABLE_AUTHENTICATION =
  process.env.CATALOGUE_DISABLE_AUTHENTICATION?.toBoolean() || false

export const CATALOGUE_CURATOR_CONTACT = process.env.CATALOGUE_CURATOR_CONTACT || 'leo@saeon.ac.za'

export const CATALOGUE_TECHNICAL_CONTACT =
  process.env.CATALOGUE_TECHNICAL_CONTACT || 'zach@saeon.ac.za'

export const CATALOGUE_CLIENT_MAX_ATLAS_LAYERS = 1000
export const CATALOGUE_CLIENT_MAX_DATABOOK_TABLES = 1000

export const CATALOGUE_API_ADDRESS = process.env.CATALOGUE_API_ADDRESS || 'http://localhost:3000'

export const CATALOGUE_API_GQL_ADDRESS = `${CATALOGUE_API_ADDRESS}/graphql`

const url = new URL(CATALOGUE_API_ADDRESS)
export const CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS = `${
  url.protocol === 'http:' ? 'ws:' : 'wss:'
}//${url.hostname}${url.port ? `:${url.port}` : ''}/graphql`

export const CATALOGUE_CLIENT_ADDRESS =
  process.env.CATALOGUE_CLIENT_ADDRESS || 'http://localhost:3001'

export const CATALOGUE_CLIENT_FILTER_CONFIG = JSON.parse(process.env.CATALOGUE_CLIENT_FILTER_CONFIG)

if (CATALOGUE_DEPLOYMENT_ENV !== 'production') {
  console.log(
    'Configuration',
    Object.fromEntries(
      Object.entries({
        CATALOGUE_CURATOR_CONTACT,
        CATALOGUE_TECHNICAL_CONTACT,
        CATALOGUE_DEPLOYMENT_ENV,
        CATALOGUE_SOURCE_CODE_URI,
        CATALOGUE_LATEST_COMMIT,
        CATALOGUE_DISABLE_AUTHENTICATION,
        CATALOGUE_API_ADDRESS,
        CATALOGUE_API_GQL_ADDRESS,
        CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS,
        CATALOGUE_CLIENT_BACKGROUNDS,
        CATALOGUE_CLIENT_DEFAULT_NOTICES,
        CATALOGUE_CLIENT_MAX_ATLAS_LAYERS,
        CATALOGUE_CLIENT_ADDRESS,
        CATALOGUE_CLIENT_FILTER_CONFIG,
      }).sort(([aKey], [bKey]) => {
        if (aKey > bKey) return 1
        if (bKey > aKey) return -1
        return 0
      })
    )
  )
}
