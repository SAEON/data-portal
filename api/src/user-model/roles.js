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
    permissions['logs:download:view'],
    permissions['logs:appRender:view'],
  ]),
}

export const curator = {
  name: 'curator',
  description: 'Data curators',
  permissions: deduplicate([
    ...saeon.permissions,
    permissions['list:update'],
    permissions['list:delete'],
    permissions['lists:view'],
    permissions['/data-lists'],
  ]),
}

export const admin = {
  name: 'admin',
  description: 'Site administrators',
  permissions: deduplicate([
    ...saeon.permissions,
    ...curator.permissions,
    permissions['/access'],
    permissions['users:assign-roles'],
    permissions['users:view'],
    permissions['roles:view'],
    permissions['permissions:view'],
    permissions['user-form-submissions:view'],
    permissions['logs:authentication:view'],
  ]),
}

export const sysadmin = {
  name: 'sysadmin',
  description: 'System administrators',
  permissions: deduplicate([...admin.permissions]),
}

export default [user, saeon, curator, admin, sysadmin]
