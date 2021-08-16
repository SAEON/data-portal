const DATE_FORMATS = {
  minute: '%Y-%m-%d %H:%M',
  hour: '%Y-%m-%d %H',
  day: '%Y-%m-%d',
  month: '%Y-%m',
  year: '%Y',
}

/**
 * Convert fields specified as
 * GraphQL fields to Mongo
 * selectors
 */
export default {
  id: () => ({ $ifNull: ['$info.doi', '$info.odpId'] }),
  clientSession: () => '$clientSession',
  clientIpAddress: () => '$clientInfo.ipAddress',
  clientIpLocation: () => '$clientInfo.ipAddress',
  referrer: () => '$referrer',
  clientUserAgent: () => '$clientInfo.userAgent',
  clientPathname: () => '$info.pathname',
  date: args => {
    const {
      value: { value: bucket },
    } = args[0]
    return { $dateToString: { format: DATE_FORMATS[bucket || 'minute'], date: '$createdAt' } }
  },
}
