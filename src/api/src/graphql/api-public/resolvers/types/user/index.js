import roles from './_roles.js'

export default {
  id: async ({ _id: id }) => id,
  roles,
}
