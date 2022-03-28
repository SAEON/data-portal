import * as config from '../config.js'

const mask = str => str?.replace(/./g, '*').padEnd(60, '*')

const MASKED_FIELDS = []

Promise.all(
  Object.entries(config).map(([field, value]) =>
    Promise.resolve(value).then(value => {
      return [
        field,
        MASKED_FIELDS.includes(field)
          ? mask(value)
          : typeof value === 'function'
          ? value.toString()
          : value
      ]
    })
  )
).then(values =>
  console.info(
    'Configuration',
    Object.fromEntries(
      values.sort(([aKey], [bKey]) => {
        if (aKey > bKey) return 1
        if (bKey > aKey) return -1
        return 0
      })
    )
  )
)
