import * as config from '../config'

if (config.DEPLOYMENT_ENV !== 'production') {
  const ignore = ['context', 'default']
  console.info(
    'Configuration',
    Object.fromEntries(
      Object.entries(config)
        .filter(([field]) => !ignore.includes(field))
        .map(([field, value]) => [field, typeof value === 'function' ? value.toString() : value])
        .sort(([aKey], [bKey]) => {
          if (aKey > bKey) return 1
          if (bKey > aKey) return -1
          return 0
        })
    )
  )
}
