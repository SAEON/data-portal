export default Object.freeze({
  '/access': {
    name: '/access',
    description: 'View the /access route on client apps',
  },
  '/usage': {
    name: '/usage',
    description: 'View the /usage route on client apps',
  },
  'list:update': {
    name: 'list:update',
    description: "Update curated lists (other lists types can't be updated",
  },
  'lists:view': {
    name: 'lists:view',
    description: 'View all curated data lists',
  },
  'list:delete': {
    name: 'list:delete',
    description: 'Delete a saved list (only lists of type = "curated" can be deleted)',
  },
  '/data-lists': {
    name: '/data-lists',
    description: 'View the /data-lists route on client apps',
  },
  'user-form-submissions:view': {
    name: 'user-form-submissions:view',
    description: 'View user-feedback submitted when downloading data',
  },
  'users:view': {
    name: 'users:view',
    description: 'View all user details',
  },
  'users:assign-roles': {
    name: 'users:assign-roles',
    description: 'Update user role membership',
  },
  'roles:view': {
    name: 'roles:view',
    description: 'View all role details',
  },
  'permissions:view': {
    name: 'permissions:view',
    description: 'View all permission details',
  },
  'logs:authentication:view': {
    name: 'logs:authentication:view',
    description: 'View authentication logs',
  },
  'logs:download:view': {
    name: 'logs:download:view',
    description: 'View download logs',
  },
  'logs:appRender:view': {
    name: 'logs:appRender:view',
    description: 'View application render logs',
  },
})
