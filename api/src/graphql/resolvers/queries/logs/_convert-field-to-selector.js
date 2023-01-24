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
  clientIpLocation: () => '$clientInfo.ipLocation',
  referrer: () => '$referrer',
  clientUserAgent: () => '$clientInfo.userAgent',
  clientIpLat: () => '$clientInfo.ipInfo.lat',
  clientIpLon: () => '$clientInfo.ipInfo.lon',
  clientPathname: () => '$info.pathname',
  userId: () => '$userId',
  type: () => '$type',
  createdAt: () => '$createdAt',
  date: ({ args, variableValues }) => {
    const bucket = variableValues?.bucket || args?.[0]?.value?.value || 'month'
    return { $dateToString: { format: DATE_FORMATS[bucket], date: '$createdAt' } }
  },
}
