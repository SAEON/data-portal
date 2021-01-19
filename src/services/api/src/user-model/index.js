import ensureRole from './_ensure-role.js'

const ROLES = {
  datascientist: 'datascientist',
  admin: 'admin',
}

export default {
  ensureDataScientist: ctx => ensureRole(ctx, ROLES.datascientist),
  ensureAdmin: ctx => ensureRole(ctx, ROLES.admin),
}
