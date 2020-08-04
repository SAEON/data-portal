import React, { useState, useEffect, createContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export const UriStateContext = createContext()

const getStateFromUri = () => {
  const href = window.location.href
  const regex = /[?&]([^=#]+)=([^&#]*)/g
  const params = {}

  var match
  while ((match = regex.exec(href))) {
    params[match[1]] = decodeURIComponent(match[2])
  }
  return params
}

export default ({ children }) => {
  const location = useLocation()
  const history = useHistory()
  const [uriState, setUriState] = useState(getStateFromUri())

  useEffect(() => {
    setUriState(getStateFromUri())
  }, [location])

  return (
    <UriStateContext.Provider
      value={{
        uriState,
        setUriState: ({ pathname = window.location.pathname, terms }) => {
          history.push({
            pathname,
            search: `?terms=${encodeURIComponent(
              terms.map(term => encodeURIComponent(term)).join(',')
            )}`,
          })
        },
      }}
    >
      {children}
    </UriStateContext.Provider>
  )
}
