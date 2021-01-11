# @saeon/pkce-client
A JavaScript browser oauth2 (PKCE) client for user-authentication/authorization against SAEON's identity service, based on a [proof-of-concept PKCE implementation](https://github.com/aaronpk/pkce-vanilla-js) provided by [Aaron Parecki](https://github.com/aaronpk).

NOTE - not working yet

```sh
npm install --save @saeon/pkce-client
```

```js
import authClient from '@saeon/pkce-client' // ESM
const authClient = require('@saeon/pkce-client') // Commonjs
```

```js
const { authenticate, logout, getBearerToken } = authClient({
  clientId,
  redirectUrl,
  authenticationEndpoint,
  tokenEndpoint,
  requestedScopes,
  logoutEndpoint,
})

// Force login
authenticate()
  .then(({ loggedIn }) => console.log(loggedIn))

// Without forcing login
authenticate({ forceLogin: false })
  .then(({ loggedIn }) => console.log(loggedIn))

/**
 * To redirect back to current path
 * 
 * This will actually result in TWO redirects
 *   (1) The redirect URL specified in the authClient
 *   (2) Then the client will load, and redirect again
 * 
 * This is because ORY Hydra requires static redirect URLS,
 * but from the client perspective you might want to preserve
 * your current path, which is dynamic depending on the path
 * that you are authenticating from
 * 
 * NOTE - No state is preserved - the page is reloaded
 */
authenticate({ redirectToCurrentPath: true })
  .then(({ loggedIn }) => console.log(loggedIn))

// logout
logout()
  .then(({ loggedIn }) => console.log(loggedIn))

/**
 * Authenticate / authorize users on your APIs
 * 
 * Once a user has logged in via the browser client,
 * you can send auth details along with
 * network requests using the Bearer schema
 * 
 * TODO
 * 
 * This is still WIP. I haven't checked that the token
 * returned by getBearerToken() works yet. If not, and,
 * if someone needs this quickly pleast let me know
 */
fetch(<url>, {
  ...,
  headers: {
    ...,
    'Authorization': getBearerToken(),
  }
})
```

# Options
```js
authClient({
  clientId: String, // Required, needs to be registered with the authentication provider
  redirectUrl: String, // Required, needs to be registered with the authentication provider
  authenticationEndpoint: String, // Required
  tokenEndpoint: String, // Required
  requestedScopes: String, // Default '' (empty string)
  logoutEndpoint: String, // Required (I think... certainly if intending to call logout())
})

authenticate({
  forceLogin: Boolean, // Default true
  redirectToCurrentPath: Boolean // Default false
})
```

# Notes
Unlike the reference implementation, instead of redirecting a user to the authentication endpoint, an initial GET request to that endpoint is made instead so that if the user is already logged in there is no redirect. This is implemented like so:

```js
...
/**
 * Authenticate user
 *
 * GET request to the authentication endpoint
 *   => Failed authentication returns the URL of the login page
 *   => Successful authentication returns the configured redirect
 *      URL with params { code, scope, state }
 */
const { url } = await fetch(authenticationUrl, {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
})

const { error, code, state } = parseQueryString(authCallback.query)

...
```

Whether or not the request is successful is determined by whether or not a `state` param is included in the URL returned by the authentication server (in this case I'm using ORY Hydra). I'm not 100% convinved this is a good check, and if there seem to be bugs in the library this is a good place to check first.