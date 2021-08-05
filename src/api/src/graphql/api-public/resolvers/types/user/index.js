import roles from './_roles.js'
import permissions from './_permissions.js'

export default {
  id: async ({ _id: id }) => id,
  roles,
  permissions,
}
