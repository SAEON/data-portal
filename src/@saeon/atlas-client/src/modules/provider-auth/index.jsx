import React, { useState, useEffect, createContext } from 'react'
import {
  CLIENT_ID as clientId,
  REDIRECT_URL as redirectUrl,
  AUTHENTICATION_ENDPOINT as authenticationEndpoint,
  TOKEN_ENDPOINT as tokenEndpoint,
  REQUESTED_SCOPES as requestedScopes,
  LOGOUT_ENDPOINT as logoutEndpoint,
} from '../../config'
import authClient from '@saeon/pkce-client'

const { authenticate, logout, getBearerToken } = authClient({
  clientId,
  redirectUrl,
  authenticationEndpoint,
  tokenEndpoint,
  requestedScopes,
  logoutEndpoint,
})

export const AuthContext = createContext()

export default ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    authenticate({ forceLogin: false }).then(({ loggedIn }) => setLoggedIn(loggedIn))
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login: ({ savePath = false } = {}) =>
          authenticate({ redirectToCurrentPath: savePath }).then(({ loggedIn }) =>
            setLoggedIn(loggedIn)
          ),
        logout: () => logout().then(({ loggedIn }) => setLoggedIn(loggedIn)),
        getBearerToken,
        loggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
