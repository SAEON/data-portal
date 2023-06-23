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
  description: 'Default login roles for @saeon.nrf.ac.za email addresses',
  permissions: deduplicate([
    ...user.permissions,
    permissions['/data-lists'],
    permissions['/usage'],
    permissions['list:delete'],
    permissions['list:update'],
    permissions['lists:view'],
    permissions['logs:view:appRender'],
    permissions['logs:view:authentication'],
    permissions['logs:view:authorization'],
    permissions['logs:view:download'],
    permissions['user-form-submissions:view'],
    
  ]),
}

export const admin = {
  name: 'admin',
  description: 'Site administrators',
  permissions: deduplicate([
    ...saeon.permissions,
    permissions['/access'],
    permissions['permissions:view'],
    permissions['roles:view'],
    permissions['users:assign-roles'],
    permissions['users:view'],
  ]),
}

export const sysadmin = {
  name: 'sysadmin',
  description: 'System administrators',
  permissions: deduplicate([...admin.permissions]),
}

export default [user, saeon, admin, sysadmin]
