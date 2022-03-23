import logBrowserEvents from '../../mutations/log-browser-events/index.js'
import createAtlas from '../../mutations/create-atlas.js'
import saveList from '../../mutations/save-list/index.js'
import deleteList from '../../mutations/delete-list/index.js'
import assignRolesToUser from '../../mutations/assign-roles-to-user.js'
import PERMISSIONS from '../../../../user-model/permissions.js'
import authorize from '../../../../user-model/authorize.js'
import submitDataDownloadForm from '../../mutations/submit-data-download-form/index.js'

export default {
  createAtlas: authorize(PERMISSIONS['atlas:create'])(createAtlas),
  deleteList: authorize(PERMISSIONS['list:delete'])(deleteList),
  assignRolesToUser: authorize(PERMISSIONS['users:assign-roles'])(assignRolesToUser),
  logBrowserEvents,
  saveList,
  submitDataDownloadForm,
}
