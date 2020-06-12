import React, { useEffect, createContext } from 'react'
import {
  CLIENT_ID as clientId,
  REDIRECT_URL as redirectUrl,
  AUTHENTICATION_ENDPOINT as authenticationEndpoint,
  TOKEN_ENDPOINT as tokenEndpoint,
  REQUESTED_SCOPES as requestedScopes,
} from '../../config'
import pkceAuthClient from '@saeon/pkce-client'

const authClient = pkceAuthClient({
  clientId,
  redirectUrl,
  authenticationEndpoint,
  tokenEndpoint,
  requestedScopes,
})

authClient.authenticate()

export const AuthContext = createContext()

export default ({ children }) => {
  useEffect(() => {}, [])

  return <AuthContext.Provider value={{ x: 1 }}>{children}</AuthContext.Provider>
}
