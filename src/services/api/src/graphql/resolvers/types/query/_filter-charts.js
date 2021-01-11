import mongodb from 'mongodb'
const { ObjectID } = mongodb

// export default async (_, { ids = null }, ctx) => {
export default async (_, args, ctx) => {
  const { findCharts, findFilters } = ctx.mongo.dataFinders

  const { chartIds, filterIds } = args
  if (!chartIds || !filterIds) {
    throw new Error('Please specify IDs of charts and filters')
  }

  const charts = await findCharts({ _id: { $in: chartIds.map(id => ObjectID(id)) } })
  const filters = await findFilters({ _id: { $in: filterIds.map(id => ObjectID(id)) } })
  //   const filteredCharts = JSON.parse(JSON.stringify(charts)) //maybe overkill to deep copy. maybe just allow the original to be changed
  //   console.log('charts', charts)
  //   console.log('charts[0].data', charts[0].data)
  //   console.log('filters', filters)

  //foreach loop / map might be more performant
  for (var i = 0; i < charts.length; i++) {
    let chart = charts[i]
    console.log('chart stuff', chart)
    for (var j = 0; j < filters.length; j++) {
      let { columnFiltered, selectedValues } = filters[j]
      //potential to-do: if chart.data column names don't include columnFiltered: Skip this filter

      if (selectedValues === []) {
        continue //Interpreting emtpy selectedValues as `Show All`. May change this to `Show None` in the future
      }
      chart.data = chart.data.filter(entry => {
        if (!entry[columnFiltered] || selectedValues.includes(entry[columnFiltered])) return true
        //TO-DO: confirm type differences are accounted for, e.g. comparing "1" to 1
        else return false
      })
    }
  }
  return charts
}
