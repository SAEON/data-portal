export const CATALOGUE_LATEST_COMMIT = process.env.CATALOGUE_LATEST_COMMIT || ''

export const CATALOGUE_CLIENT_BACKGROUNDS = process.env.CATALOGUE_CLIENT_BACKGROUNDS || ''

export const CATALOGUE_DEPLOYMENT_ENV = process.env.CATALOGUE_DEPLOYMENT_ENV || 'local'

export const CATALOGUE_CLIENT_DEFAULT_NOTICES = process.env.CATALOGUE_CLIENT_DEFAULT_NOTICES || ''

export const CATALOGUE_SOURCE_CODE_URI =
  process.env.CATALOGUE_SOURCE_CODE_URI || 'https://github.com/SAEONData/catalogue'

export const CATALOGUE_CURATOR_CONTACT = process.env.CATALOGUE_CURATOR_CONTACT || 'leo@saeon.ac.za'

export const CATALOGUE_TECHNICAL_CONTACT =
  process.env.CATALOGUE_TECHNICAL_CONTACT || 'zach@saeon.ac.za'

export const CATALOGUE_CLIENT_MAX_ATLAS_LAYERS = 1000
export const CATALOGUE_CLIENT_MAX_DATABOOK_TABLES = 10

export const CATALOGUE_API_ADDRESS = process.env.CATALOGUE_API_ADDRESS || 'http://localhost:3000'

export const CATALOGUE_API_GQL_ADDRESS =
  process.env.CATALOGUE_API_GQL_ADDRESS || 'http://localhost:3000/graphql'

export const CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS =
  process.env.CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS || 'ws://localhost:3000/graphql'

export const CATALOGUE_CLIENT_ADDRESS =
  process.env.CATALOGUE_CLIENT_ADDRESS || 'http://localhost:3001'

export const CATALOGUE_CLIENT_AUTH_ID = process.env.CATALOGUE_CLIENT_AUTH_ID || 'saeon-data-portal' // 'saeonatlasclienttest'

export const CATALOGUE_CLIENT_AUTH_REDIRECT_URL =
  process.env.CATALOGUE_CLIENT_AUTH_REDIRECT_URL || 'http://localhost:3001/authenticated'

export const CATALOGUE_CLIENT_AUTH_ENDPOINT =
  process.env.CATALOGUE_CLIENT_AUTH_ENDPOINT || 'https://odp.saeon.dvn/auth/oauth2/auth'

export const CATALOGUE_CLIENT_AUTH_LOGOUT_ENDPOINT =
  process.env.CATALOGUE_CLIENT_AUTH_LOGOUT_ENDPOINT ||
  'https://odp.saeon.dvn/auth/oauth2/sessions/logout'

export const CATALOGUE_CLIENT_AUTH_TOKEN_ENDPOINT =
  process.env.CATALOGUE_CLIENT_AUTH_TOKEN_ENDPOINT || 'https://odp.saeon.dvn/auth/oauth2/token'

export const CATALOGUE_CLIENT_AUTH_REQUESTED_SCOPES =
  process.env.CATALOGUE_CLIENT_AUTH_REQUESTED_SCOPES || 'SAEON.atlas'

export const CATALOGUE_CLIENT_AUTH = process.env.CATALOGUE_CLIENT_AUTH || 'enabled'

export const CATALOGUE_CLIENT_FILTER_CONFIG =
  CATALOGUE_DEPLOYMENT_ENV === 'local'
    ? [
        {
          title: 'Keywords',
          field: 'subjects.subject.raw',
          sortOrder: 'desc',
          sortBy: 'doc_count',
        },
        {
          title: 'Publication Year',
          field: 'publicationYear',
          sortOrder: 'desc',
        },
        {
          title: 'Publisher',
          field: 'publisher.raw',
        },
        {
          title: 'Creators',
          field: 'creators.name.raw',
        },
      ]
    : JSON.parse(process.env.CATALOGUE_CLIENT_FILTER_CONFIG)

if (CATALOGUE_DEPLOYMENT_ENV !== 'production') {
  console.log('Configuration', {
    CATALOGUE_CURATOR_CONTACT,
    CATALOGUE_TECHNICAL_CONTACT,
    CATALOGUE_DEPLOYMENT_ENV,
    CATALOGUE_SOURCE_CODE_URI,
    CATALOGUE_LATEST_COMMIT,
    CATALOGUE_CLIENT_BACKGROUNDS,
    CATALOGUE_CLIENT_DEFAULT_NOTICES,
    CATALOGUE_CLIENT_MAX_ATLAS_LAYERS,
    CATALOGUE_API_ADDRESS,
    CATALOGUE_API_GQL_ADDRESS,
    CATALOGUE_API_GQL_SUBSCRIPTIONS_ADDRESS,
    CATALOGUE_CLIENT_AUTH_ID,
    CATALOGUE_CLIENT_ADDRESS,
    CATALOGUE_CLIENT_AUTH_REDIRECT_URL,
    CATALOGUE_CLIENT_AUTH_ENDPOINT,
    CATALOGUE_CLIENT_AUTH_LOGOUT_ENDPOINT,
    CATALOGUE_CLIENT_AUTH_TOKEN_ENDPOINT,
    CATALOGUE_CLIENT_AUTH_REQUESTED_SCOPES,
    CATALOGUE_CLIENT_AUTH,
    CATALOGUE_CLIENT_FILTER_CONFIG,
  })
}
