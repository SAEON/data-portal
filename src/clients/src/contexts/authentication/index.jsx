import { useState, useEffect, createContext, useContext } from 'react'
import { API_PUBLIC_ADDRESS, context as configContext } from '../../config'

export const context = createContext()

export default ({ children }) => {
  const { contentBase } = useContext(configContext)
  const [user, setUser] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)

  const authenticate = () => {
    if (user) {
      return true
    } else {
      window.location.href = `${contentBase}/login?redirect=${window.location.href}`
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    ;(async () => {
      setAuthenticating(true)
      try {
        const response = await fetch(`${API_PUBLIC_ADDRESS}/authenticate`, {
          credentials: 'include',
          mode: 'cors',
          signal: abortController.signal,
        })
        const userInfo = await response.json()
        setUser(userInfo)
        setAuthenticating(false)
      } catch (error) {
        throw new Error('Error authenticating user ::' + error.message)
      }
    })()

    return () => {
      abortController.abort()
    }
  }, [])

  return (
    <context.Provider
      value={{
        user,
        authenticating,
        authenticate,
      }}
    >
      {children}
    </context.Provider>
  )
}
