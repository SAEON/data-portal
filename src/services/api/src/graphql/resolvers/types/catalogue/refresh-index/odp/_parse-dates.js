import parse from 'date-fns/parse/index.js'
import lastDayOfYear from 'date-fns/lastDayOfYear/index.js'

export default dates =>
  dates.map(({ date, dateType }) => {
    const dateStrings = date.split('/')
    const from = dateStrings[0]
    const to = dateStrings[1] || dateStrings[0]
    return {
      gte: parse(from, 'yyyy-MM-dd', new Date()).toISOString(),
      lte:
        to === from
          ? lastDayOfYear(parse(to, 'yyyy-MM-dd', new Date())).toISOString()
          : parse(to, 'yyyy-MM-dd', new Date()).toISOString(),
      dateType,
    }
  })
