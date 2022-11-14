/**
 * Public access
 */

export { default as home } from './home/index.js'
export { default as authenticate } from './authenticate/index.js'
export { default as loginSuccess } from './login-success/index.js'
export { default as clientInfo } from './client-info/index.js'
export { default as downloadProxy } from './download-proxy/index.js'
export { default as login } from './login/index.js'
export { default as logout } from './logout/index.js'
export { default as oauthAuthenticationCallback } from './oauth-authentication-callback/index.js'

/**
 * Protected routes
 */
// import { authorizeHttp as a } from '../user-model/authorize.js'
// import P from '../user-model/permissions.js'
// import someRoute_ from './soume-route/index.js'

// export const someRoute = a({ permission: P['some-permission']})(someRoute_)
