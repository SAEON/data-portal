import { parse, isMatch, lastDayOfYear } from 'date-fns'

const LOCALE_0 = 'yyyy'
const LOCALE_1 = 'yyyy-MM-dd'
const LOCALE_2 = "yyyy-MM-dd'T'HH:mm:ssxxxxx"

const _parse = (id, dt) => {
  // 2020-08-05T00:00:00+02:00
  if (isMatch(dt, LOCALE_2)) {
    return parse(dt, LOCALE_2, new Date())
  }

  // 2020-08-27
  if (isMatch(dt, LOCALE_1)) {
    return parse(dt, LOCALE_1, new Date())
  }

  // 2020
  if (isMatch(dt, LOCALE_0)) {
    return parse(dt, LOCALE_0, new Date())
  }

  throw new Error(`Unexpected date format returned by ODP - ${JSON.stringify(dt, null, 2)}`)
}

export default (id, dates) => {
  try {
    return dates.map(({ date, dateType }) => {
      const delimiter = date.includes('/') ? '/' : ' '
      const dateStrings = date.split(delimiter)
      const from = dateStrings[0]
      const to = dateStrings[1] || dateStrings[0]

      const gte = _parse(id, from)
      const lte = _parse(id, to)

      return {
        gte: gte.toISOString(),
        lte: to === from ? lastDayOfYear(lte).toISOString() : lte.toISOString(),
        dateType,
      }
    })
  } catch (error) {
    throw new Error(`Unable to parse dates. ${error.message}`)
  }
}
