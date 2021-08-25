import permissions from './permissions.js'

export const user = {
  name: 'user',
  description: 'Default login role',
  permissions: [],
}

export const saeon = {
  name: 'saeon',
  description: 'Default login roles for @saeon.ac.za email addresses',
  permissions: [
    ...user.permissions,
    permissions['atlas:create'],
    permissions['databook:create'],
    permissions['/usage'],
    permissions['site-analytics:view'],
  ],
}

export const admin = {
  name: 'admin',
  description: 'Site administrators',
  permissions: [
    ...saeon.permissions,
    permissions['lists:view'],
    permissions['/data-lists'],
    permissions['/access'],
    permissions['users:assign-roles'],
    permissions['users:view'],
    permissions['roles:view'],
    permissions['permissions:view'],
  ],
}

export const sysadmin = {
  name: 'sysadmin',
  description: 'System administrators',
  permissions: [...admin.permissions],
}

export default [user, saeon, admin, sysadmin]
