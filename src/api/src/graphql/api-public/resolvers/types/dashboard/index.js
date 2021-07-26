import addChart from './_add-chart.js'
import removeChart from './_remove-chart.js'
import addFilter from './_add-filter.js'
import removeFilter from './_remove-filter.js'
import charts from './_charts.js'
import filters from './_filters.js'

export default {
  id: async self => self._id,
  addChart,
  removeChart,
  addFilter,
  removeFilter,
  charts,
  filters,
}
