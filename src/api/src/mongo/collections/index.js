/**
 * I find it helpful to define collections
 * in a separate file when a validator
 * or indices field is used
 */

import Roles from './_roles.js'
import Permissions from './_permissions.js'
import Users from './_users.js'
import Logs from './_logs.js'
import Lists from './_lists.js'
import DataDownloadFormSubmissions from './_data-download-form-submissions.js'

export default {
  Roles,
  Permissions,
  Users,
  Logs,
  Lists,
  DataDownloadFormSubmissions,
  Atlases: { name: 'atlases' },
}
