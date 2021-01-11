import { useState, useEffect, createContext } from 'react'
import { CATALOGUE_API_ADDRESS } from '../config'

export const AuthContext = createContext()

export default ({ children }) => {
  const [userInfo, setUserInfo] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)

  useEffect(() => {
    const _ = async () => {
      setAuthenticating(true)
      fetch(`${CATALOGUE_API_ADDRESS}/authenticate`, {
        credentials: 'include',
        mode: 'cors',
      })
        .then(res => res.json())
        .then(userInfo => {
          setUserInfo(userInfo)
          setAuthenticating(false)
        })
    }
    _()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        authenticating,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
