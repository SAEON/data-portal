import logBrowserEvents from '../mutations/log-browser-events.js'
import createDatabook from '../mutations/create-databook/index.js'
import createAtlas from '../mutations/create-atlas.js'
import saveList from '../mutations/save-list/index.js'
import deleteList from '../mutations/delete-list/index.js'
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
import updateRecordDataFormat from '../mutations/update-record-data-format/index.js'
import databook from '../queries/databook.js'
import submitDataDownloadForm from '../mutations/submit-data-download-form/index.js'

export default {
  createDatabook: authorize(PERMISSIONS['databook:create'])(createDatabook),
  createAtlas: authorize(PERMISSIONS['atlas:create'])(createAtlas),
  deleteList: authorize(PERMISSIONS['list:delete'])(deleteList),
  assignRolesToUser: authorize(PERMISSIONS['users:assign-roles'])(assignRolesToUser),
  updateRecordDataFormat: authorize(PERMISSIONS['es-index:update'])(updateRecordDataFormat),
  databook, // TODO - should be per resource owner, but that breaks sharing
  logBrowserEvents,
  saveList,
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
  submitDataDownloadForm,
}
