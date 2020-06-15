# @saeon/pkce-client
A JavaScript browser oauth2 (PKCE) client for user-authentication/authorization against SAEON's identity service. This package is based on a [proof-of-concept PKCE implementation](https://github.com/aaronpk/pkce-vanilla-js) provided by [Aaron Parecki](https://github.com/aaronpk), maintainer of oauth.net. It seems pretty reasonable, and so has been adapted here.

# Example
```js
import authClient from '@saeon/pkce-client'

const { authenticate, logout, getBearerToken, setApplicationState } = authClient({
  clientId,
  redirectUrl,
  authenticationEndpoint,
  tokenEndpoint,
  requestedScopes,
  logoutEndpoint,
})

// Perhaps on app start you want to see if the user is logged in
authenticate({ forceLogin: false })
  .then(({ loggedIn }) => console.log(loggedIn))

// Otherwise you might want to see if the user is logged in, and log in if not (forceLogin defaults to true)
authenticate()
  .then(({ loggedIn }) => console.log(loggedIn))

// logout
logout().then(({loggedIn}) => console.log(loggedIn))

// TODO - getBearerToken, setApplicationState. This should be 'setRedirectUrl'
```

## Creating a client
It is helpful following along with this [ORY Hydra tutorial](https://www.ory.sh/hydra/docs/5min-tutorial/) to learn a little bit about OAuth2 to get your bearings on how the authentcation / authorization server is used by the client. With reference to SAEON's ORY Hydra server, the following configuration is required (Just copy / paste these into the shell to create variables used by the create / delete commands below):

```sh
HYDRA_DOCKER_IMAGE=
CLIENT_ID=
CLIENT_SECRET=
GRANT_TYPE=authorization_code
RESPONSE_TYPE=code
SCOPE=
LOGIN_CALLBACK=
```

#### Add a client
```
docker run -it --rm --network odp-core-net -e HYDRA_ADMIN_URL=https://hydra:4445 ${HYDRA_DOCKER_IMAGE} clients create --skip-tls-verify --id ${CLIENT_ID} --secret ${CLIENT_SECRET} --token-endpoint-auth-method none --grant-types ${GRANT_TYPE} --response-types ${RESPONSE_TYPE} --scope ${SCOPE} --callbacks ${LOGIN_CALLBACK} --allowed-cors-origins=http://localhost:3001
```

#### Remove a client
```sh
docker run -it --rm --network odp-core-net -e HYDRA_ADMIN_URL=https://hydra:4445 ${HYDRA_DOCKER_IMAGE} clients delete --skip-tls-verify ${CLIENT_ID}
```