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
  _id: () => '$_id',
  clientIpAddress: () => '$clientInfo.ipAddress',
  clientIpAs: () => '$clientInfo.ipInfo.as',
  clientIpAsname: () => '$clientInfo.ipInfo.asname',
  clientIpCity: () => '$clientInfo.ipInfo.city',
  clientIpContinent: () => '$clientInfo.ipInfo.continent',
  clientIpContinentCode: () => '$clientInfo.ipInfo.continentCode',
  clientIpCountry: () => '$clientInfo.ipInfo.country',
  clientIpCountryCode: () => '$clientInfo.ipInfo.countryCode',
  clientIpCurrency: () => '$clientInfo.ipInfo.currency',
  clientIpDistrict: () => '$clientInfo.ipInfo.district',
  clientIpHosting: () => '$clientInfo.ipInfo.hosting',
  clientIpIsp: () => '$clientInfo.ipInfo.isp',
  clientIpLat: () => '$clientInfo.ipInfo.lat',
  clientIpLocation: () => '$clientInfo.ipLocation',
  clientIpLon: () => '$clientInfo.ipInfo.lon',
  clientIpMobile: () => '$clientInfo.ipInfo.mobile',
  clientIpOrg: () => '$clientInfo.ipInfo.org',
  clientIpProxy: () => '$clientInfo.ipInfo.proxy',
  clientIpRegion: () => '$clientInfo.ipInfo.region',
  clientIpRegionName: () => '$clientInfo.ipInfo.regionName',
  clientIpTimezone: () => '$clientInfo.ipInfo.timezone',
  clientIpZip: () => '$clientInfo.ipInfo.zip',
  clientPathname: () => '$info.pathname',
  clientSession: () => '$clientSession',
  clientUserAgent: () => '$clientInfo.userAgent',
  createdAt: () => '$createdAt',
  date: ({ args, variableValues }) => {
    const bucket = variableValues?.bucket || args?.[0]?.value?.value || 'month'
    return { $dateToString: { format: DATE_FORMATS[bucket], date: '$createdAt' } }
  },
  doi: () => ({ $ifNull: ['$info.doi', '$info.odpId'] }),
  referrer: () => '$referrer',
  type: () => '$type',
  userId: () => '$userId',
}
