import catalogue from '../queries/catalogue.js'
import dashboard from '../queries/dashboard.js'
import dashboards from '../queries/dashboards.js'
import charts from '../queries/charts.js'
import filters from '../queries/filters.js'
import databook from '../queries/databook.js'
import list from '../queries/list.js'
import lists from '../queries/lists.js'
import atlas from '../queries/atlas.js'
import roles from '../queries/roles.js'
import permissions from '../queries/permissions.js'
import user from '../queries/user.js'
import users from '../queries/users.js'
import PERMISSIONS from '../../../../user-model/permissions.js'
import authorize from '../../../../user-model/authorize.js'
import downloadsReport from '../queries/downloads-report/index.js'

const getUserOwner = async ([, args, ctx]) => ctx.userInfo.id === args.id

export default {
  catalogue,
  dashboard,
  dashboards,
  charts,
  filters,
  databook, // TODO
  list,
  lists: authorize(PERMISSIONS['lists:view'])(lists),
  atlas,
  downloadsReport: authorize(PERMISSIONS['site-analytics:view'])(downloadsReport),
  roles: authorize(PERMISSIONS['roles:view'])(roles),
  user: async (...args) =>
    authorize(PERMISSIONS['users:view'], await getUserOwner(args))(user)(...args),
  users: authorize(PERMISSIONS['users:view'])(users),
  permissions: authorize(PERMISSIONS['permissions:view'])(permissions),
}
