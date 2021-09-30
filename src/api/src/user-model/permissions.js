export default Object.freeze({
  '/curator-tools': {
    name: '/curator-tools',
    description: 'View the curator tools app',
  },
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
  'site-analytics:view': {
    name: 'site-analytics:view',
    description: 'View catalogue deployment analytics',
  },
  'databook:create': {
    name: 'databook:create',
    description: 'Create databook from vector-based spatial datasets',
  },
  'atlas:create': {
    name: 'atlas:create',
    description: 'Create an atlas to view SAEON GeoServer maps',
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
  'es-index:update': {
    name: 'es-index:update',
    description: 'Update indexed metadata',
  },
  'as-odp-user:curator': {
    name: 'as-odp-user:curator',
    description: 'Make requests to 3rd party API using external authorization credentials',
  },
})
