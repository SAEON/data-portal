import { createContext } from 'react'

export const LATEST_COMMIT = process.env.LATEST_COMMIT || ''

export const CATALOGUE_CLIENT_BACKGROUNDS = process.env.CATALOGUE_CLIENT_BACKGROUNDS || ''

export const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV || 'development'

export const CLIENTS_DEFAULT_NOTICES = process.env.CLIENTS_DEFAULT_NOTICES || '' // "msg,info;msg2,warn;msg3,error;etd"

export const CATALOGUE_SOURCE_CODE_URI =
  process.env.CATALOGUE_SOURCE_CODE_URI || 'https://github.com/SAEON/catalogue'

export const CURATOR_CONTACT = process.env.CURATOR_CONTACT || 'pl.chiloane@saeon.nrf.ac.za'

export const TECHNICAL_CONTACT = process.env.TECHNICAL_CONTACT || 'zd.smith@saeon.nrf.ac.za'

export const CATALOGUE_CLIENT_MAX_ATLAS_LAYERS = 1000
export const CATALOGUE_CLIENT_MAX_DATABOOK_TABLES = 50

export const API_PUBLIC_ADDRESS = process.env.API_PUBLIC_ADDRESS || 'http://localhost:3000'

export const API_INTERNAL_ADDRESS = process.env.API_INTERNAL_ADDRESS || 'http://localhost:4000'

export const PROXY_ADDRESS = process.env.PROXY_ADDRESS || 'http://localhost:8001'

export const PUBLIC_GQL_ADDRESS = `${API_PUBLIC_ADDRESS}/graphql`

export const INTERNAL_GQL_ADDRESS = `${API_INTERNAL_ADDRESS}/graphql`

const url = new URL(API_PUBLIC_ADDRESS)
export const API_GQL_SUBSCRIPTIONS_ADDRESS = `${url.protocol === 'http:' ? 'ws:' : 'wss:'}//${
  url.hostname
}${url.port ? `:${url.port}` : ''}/graphql`

export const CLIENTS_PUBLIC_ADDRESS = process.env.CLIENTS_PUBLIC_ADDRESS || 'http://localhost:3001'

export const CATALOGUE_CLIENT_FILTER_CONFIG = JSON.parse(process.env.CATALOGUE_CLIENT_FILTER_CONFIG)

export const PACKAGE_DESCRIPTION = process.env.PACKAGE_DESCRIPTION.toString()

export const CATALOGUE_SUPPORTED_DATABOOK_FORMATS = process.env
  .CATALOGUE_SUPPORTED_DATABOOK_FORMATS || ['SHAPEFILE', 'NETCDF', 'ASC']

export const PACKAGE_KEYWORDS = process.env.PACKAGE_KEYWORDS.toString().split(',')

export const SUBDOMAIN_APP_ENTRIES = process.env.SUBDOMAIN_APP_ENTRIES || ''

export const EMAIL_REGEX = new RegExp(
  process.env.EMAIL_REGEX ||
    `^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`
)

/**
 * Dynamic config
 */

export const context = createContext()

export default ({ children, contentBase }) => (
  <context.Provider value={{ contentBase }}>{children}</context.Provider>
)
