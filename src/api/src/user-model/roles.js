import permissions from './permissions.js'

export const user = {
  name: 'user',
  description: 'Default login role',
  permissions: [],
}

export const saeon = {
  name: 'saeon',
  description: 'Default login roles for @saeon.ac.za email addresses',
  permissions: [permissions['databook:create']],
}

export const admin = {
  name: 'admin',
  description: 'Site administrators',
  permissions: [
    ...saeon.permissions,
    permissions['/access'],
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
