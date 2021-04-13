import * as config from '../config.js'

const mask = str => str?.replace(/./g, '*').padEnd(60, '*')

const MASKED_FIELDS = [
  'CATALOGUE_API_KEY',
  'CATALOGUE_API_TWITTER_CLIENT_SECRET',
  'CATALOGUE_API_GOOGLE_CLIENT_SECRET',
  'CATALOGUE_API_ODP_CLIENT_SECRET',
  'MONGO_DB_USERNAME',
  'MONGO_DB_PASSWORD',
  'POSTGIS_USERNAME',
  'POSTGIS_PASSWORD',
]

console.log(
  'Configuration',
  Object.fromEntries(
    Object.entries(config)
      .map(([field, value]) => [
        field,
        MASKED_FIELDS.includes(field)
          ? mask(value)
          : typeof value === 'function'
          ? value.toString()
          : value,
      ])
      .sort(([aKey], [bKey]) => {
        if (aKey > bKey) return 1
        if (bKey > aKey) return -1
        return 0
      })
  )
)
