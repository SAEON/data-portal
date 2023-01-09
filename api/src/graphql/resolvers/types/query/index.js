import catalogue from '../../queries/catalogue/index.js'
import list from '../../queries/list/index.js'
import lists from '../../queries/lists/index.js'
import roles from '../../queries/roles/index.js'
import permissions from '../../queries/permissions/index.js'
import user from '../../queries/user/index.js'
import users from '../../queries/users/index.js'
import PERMISSIONS from '../../../../user-model/permissions.js'
import { authorizeGql as a } from '../../../../user-model/authorize.js'
import downloadsReport from '../../queries/downloads-report/index.js'
import usageReport from '../../queries/usage-report/index.js'
import userFormSubmissions from '../../queries/form-submissions/index.js'

const getUserDocumentOwner = async (self, args, ctx) => ctx.userInfo.id === args.id

export default {
  catalogue,
  list,
  lists: a({ permission: PERMISSIONS['lists:view'] })(lists),
  downloadsReport: a({ permission: PERMISSIONS['site-analytics:view'] })(downloadsReport),
  usageReport: a({ permission: PERMISSIONS['site-analytics:view'] })(usageReport),
  roles: a({ permission: PERMISSIONS['roles:view'] })(roles),
  user: async (...args) =>
    a({
      permission: PERMISSIONS['users:view'],
      resourceOwner: await getUserDocumentOwner(...args),
    })(user)(...args),
  users: a({ permission: PERMISSIONS['users:view'] })(users),
  permissions: a({ permission: PERMISSIONS['permissions:view'] })(permissions),
  userFormSubmissions: a({ permission: PERMISSIONS['user-form-submissions:view'] })(
    userFormSubmissions
  ),
}
