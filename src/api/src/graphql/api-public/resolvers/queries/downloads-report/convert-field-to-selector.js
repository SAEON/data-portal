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
  doi: () => ({ $ifNull: ['$info.doi', '$info.odpId'] }),
  clientSession: () => '$clientSession',
  clientIpAddress: () => '$clientInfo.ipAddress',
  /**
   * Currently the clientIpLocation is not ever requested from
   * Mongo, since it's replaced with clientIpAddress in query.js
   * (the location comes from an API). However I suspect that this
   * will need to change, with this report prepared eagerly rather
   * than lazily. that is why this line is still here
   */
  // clientIpLocation: () => '$clientInfo.ipAddress',
  referrer: () => '$referrer',
  clientUserAgent: () => '$clientInfo.userAgent',
  clientPathname: () => '$info.pathname',
  date: args => {
    const {
      value: { value: bucket },
    } = args[0]
    return { $dateToString: { format: DATE_FORMATS[bucket || 'month'], date: '$createdAt' } }
  },
}
