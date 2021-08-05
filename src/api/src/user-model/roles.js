import permissions from './permissions.js'

const user = {
  name: 'user',
  description: 'Default login role',
  permissions: [],
}

const saeon = {
  name: 'saeon',
  description: 'Default login roles for @saeon.ac.za email addresses',
  permissions: [permissions['databook:create']],
}

const admin = {
  name: 'admin',
  description: 'Site administrators',
  permissions: [...saeon.permissions, permissions['/access']],
}

const sysadmin = {
  name: 'sysadmin',
  description: 'System administrators',
  permissions: [...admin.permissions],
}

export default [user, saeon, admin, sysadmin]
