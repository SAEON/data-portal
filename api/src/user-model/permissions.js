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
  'record:view-downloadCount': {
    name: 'record:view-downloadCount',
    description: 'View the number of times a record has been downloaded',
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
  'logs:view': {
    name: 'logs:view',
    description: 'View logs',
    documentTypePermissions: {
      appRender: 'logs:view:appRender',
      authentication: 'logs:view:authentication',
      authorization: 'logs:view:authorization',
      download: 'logs:view:download',
    },
  },
  'logs:view:appRender': {
    name: 'logs:view:appRender',
    description: 'View application render logs',
  },
  'logs:view:authentication': {
    name: 'logs:view:authentication',
    description: 'View authentication logs',
  },
  'logs:view:authorization': {
    name: 'logs:view:authorization',
    description: 'View authorization logs',
  },
  'logs:view:download': {
    name: 'logs:view:download',
    description: 'View download logs',
  },
})
