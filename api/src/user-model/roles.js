import permissions from './permissions.js'
import _deduplicate from '../lib/deduplicate-obj.js'

const deduplicate = arr => _deduplicate(arr, (p1, p2) => p1.name === p2.name)

export const user = {
  name: 'user',
  description: 'Default login role',
  permissions: deduplicate([permissions['record:view-downloadCount']]),
}

export const saeon = {
  name: 'saeon',
  description: 'Default login roles for @saeon.ac.za email addresses',
  permissions: deduplicate([
    ...user.permissions,
    permissions['/usage'],
    permissions['logs:view:download'],
    permissions['logs:view:appRender'],
    permissions['list:update'],
    permissions['list:delete'],
    permissions['lists:view'],
    permissions['/data-lists'],
    permissions['user-form-submissions:view'],
    permissions['logs:view:authentication'],
    permissions['logs:view:authorization'],
  ]),
}

export const admin = {
  name: 'admin',
  description: 'Site administrators',
  permissions: deduplicate([
    ...saeon.permissions,
    permissions['/access'],
    permissions['users:assign-roles'],
    permissions['users:view'],
    permissions['roles:view'],
    permissions['permissions:view'],
  ]),
}

export const sysadmin = {
  name: 'sysadmin',
  description: 'System administrators',
  permissions: deduplicate([...admin.permissions]),
}

export default [user, saeon, curator, admin, sysadmin]
