import schema from './schema/index.js'
import dashboards from './_dashboards.js'
import charts from './_charts.js'
import filters from './_filters.js'
import markSchemaObjectPublic from './_mark-schema-object-public.js'

export default {
  id: async self => self._id,
  schema,
  dashboards,
  charts,
  filters,
  markSchemaObjectPublic,
  statusHash: async self => self.tables,
}
