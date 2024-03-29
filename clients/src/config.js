import { createContext } from 'react'

export const CATALOGUE_CLIENT_BACKGROUNDS = process.env.CATALOGUE_CLIENT_BACKGROUNDS || ''

export const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV || 'development'

export const CLIENTS_DEFAULT_NOTICES = process.env.CLIENTS_DEFAULT_NOTICES || '' // "msg,info;msg2,warn;msg3,error;etd"

export const CATALOGUE_SOURCE_CODE_URI =
  process.env.CATALOGUE_SOURCE_CODE_URI || 'https://github.com/SAEON/catalogue'

export const CURATOR_CONTACT = process.env.CURATOR_CONTACT || 'curation@saeon.nrf.ac.za'

export const TECHNICAL_CONTACT = process.env.TECHNICAL_CONTACT || 'development@saeon.nrf.ac.za'

export const API_ADDRESS = process.env.API_ADDRESS || 'http://localhost:3000'

export const PUBLIC_HTTP_ADDRESS = `${API_ADDRESS}/http`

export const PROXY_ADDRESS = process.env.PROXY_ADDRESS || 'https://proxy.saeon.ac.za'

export const PUBLIC_GQL_ADDRESS = `${API_ADDRESS}/graphql`

const url = new URL(PUBLIC_GQL_ADDRESS)
export const API_GQL_SUBSCRIPTIONS_ADDRESS = `${url.protocol === 'http:' ? 'ws:' : 'wss:'}//${
  url.hostname
}${url.port ? `:${url.port}` : ''}/graphql`

export const CLIENTS_PUBLIC_ADDRESS = process.env.CLIENTS_PUBLIC_ADDRESS || 'http://localhost:3001'

export const CLIENT_FILTER_CONFIG = JSON.parse(process.env.CLIENT_FILTER_CONFIG)

export const PACKAGE_DESCRIPTION = process.env.PACKAGE_DESCRIPTION.toString()

export const PACKAGE_KEYWORDS = process.env.PACKAGE_KEYWORDS.toString().split(',')

export const SUBDOMAIN_APP_ENTRIES = process.env.SUBDOMAIN_APP_ENTRIES || ''

export const ESRI_API_KEY = process.env.ESRI_API_KEY || ''

export const EMAIL_REGEX = new RegExp(
  `^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$`
)

export const CLIENT_FACET_CONFIGURATION = [
  ...CLIENT_FILTER_CONFIG.map(({ id, field, path, filters, sortBy, sortOrder }) => {
    return { id, field, path, filters, sortBy, sortOrder }
  }),
]

/**
 * Dynamic config
 */

export const context = createContext()

export default ({ children, contentBase }) => (
  <context.Provider value={{ contentBase }}>{children}</context.Provider>
)
