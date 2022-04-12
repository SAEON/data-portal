import { authorizeHttp as a } from '../user-model/authorize.js'
import P from '../user-model/permissions.js'

/**
 * Public access
 */

export { default as home }  from './home/index.js'
export { default as authenticate }  from './authenticate/index.js'
export { default as loginSuccess }  from './login-success/index.js'
export { default as clientInfo }  from './client-info/index.js'
export { default as downloadProxy }  from './download-proxy/index.js'
export { default as sqlPublic }  from './sql-public/index.js'
export { default as login }  from './login/index.js'
export { default as logout }  from './logout/index.js'
export { default as oauthAuthenticationCallback }  from './oauth-authentication-callback/index.js'


/**
 * Protected routes
 */
 import sqlPrivate_  from './sql-private/index.js'
 
export const sqlPrivate = a({permission: P['/access']})(sqlPrivate_)