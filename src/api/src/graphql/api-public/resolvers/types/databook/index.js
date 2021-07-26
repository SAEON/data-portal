import schema from './schema/index.js'
import dashboards from './_dashboards.js'
import charts from './_charts.js'
import filters from './_filters.js'

export default {
  id: async self => self._id,
  schema,
  dashboards,
  charts,
  filters,
  statusHash: async self => self.tables,
}
