import logBrowserEvents from '../mutations/log-browser-events.js'
import createDatabook from '../mutations/create-databook/index.js'
import createAtlas from '../mutations/create-atlas.js'
import persistSearchState from '../mutations/persist-search-state.js'
import createDashboard from '../mutations/create-dashboard.js'
import updateDashboard from '../mutations/update-dashboard.js'
import updateDatabook from '../mutations/update-databook.js'
import deleteDashboard from '../mutations/delete-dashboard.js'
import dashboard from '../mutations/dashboard.js'
import createChart from '../mutations/create-chart.js'
import editChart from '../mutations/edit-chart.js'
import deleteChart from '../mutations/delete-chart.js'
import createFilter from '../mutations/create-filter.js'
import deleteFilter from '../mutations/delete-filter.js'
import assignRolesToUser from '../mutations/assign-roles-to-user.js'
import PERMISSIONS from '../../../../user-model/permissions.js'
import authorize from '../../../../user-model/authorize.js'

export default {
  logBrowserEvents,
  createDatabook: authorize(PERMISSIONS['databook:create'])(createDatabook),
  createAtlas: authorize(PERMISSIONS['atlas:create'])(createAtlas),
  persistSearchState,
  createDashboard,
  updateDashboard,
  updateDatabook,
  deleteDashboard,
  dashboard,
  createChart,
  editChart,
  deleteChart,
  createFilter,
  deleteFilter,
  assignRolesToUser: authorize(PERMISSIONS['users:assign-roles'])(assignRolesToUser),
}
