import { parse, lastDayOfYear } from 'date-fns'

export default dates =>
  dates.map(({ date, dateType }) => {
    const dateStrings = date.split('/')
    const from = dateStrings[0]
    const to = dateStrings[1] || dateStrings[0]
    console.log('trying', JSON.stringify(from), typeof from, JSON.stringify(to), typeof to)
    console.log(parse(from, 'yyyy-MM-dd', new Date()))
    // TODO .replace(/T.*$/, '')
    return {
      gte: parse(from, 'yyyy-MM-dd', new Date()).toISOString(),
      lte:
        to === from
          ? lastDayOfYear(parse(to, 'yyyy-MM-dd', new Date())).toISOString()
          : parse(to, 'yyyy-MM-dd', new Date()).toISOString(),
      dateType,
    }
  })
