import React, { useEffect, createContext } from 'react'
import pkceAuthClient from '@saeon/pkce-client'

const authClient = pkceAuthClient({
  clientId: 'saeonatlasclienttest',
  redirectUrl: 'http://localhost:3001/authenticated',
  authenticationEndpoint: 'https://odp.saeon.dvn/auth/oauth2/auth',
  tokenEndpoint: 'https://odp.saeon.dvn/auth/oauth2/token',
  requestedScopes: '',
})

authClient.authenticate()

export const AuthContext = createContext()

export default ({ children }) => {
  useEffect(() => {}, [])

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
