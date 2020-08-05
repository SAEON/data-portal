import React, { useState, useEffect, createContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export const UriStateContext = createContext()

const getStateFromUri = (split = false) => {
  const url = window.location.href
  const regex = /[?&]([^=#]+)=([^&#]*)/g
  const params = {}

  var match
  while ((match = regex.exec(url))) {
    params[match[1]] = split
      ? decodeURIComponent(match[2])
          .split(',')
          .map(item => decodeURIComponent(item))
          .filter(_ => _)
      : decodeURIComponent(match[2])
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
        setUriState: ({
          pathname = window.location.pathname,
          terms = getStateFromUri(true).terms || [],
          preview = getStateFromUri(true).preview || [],
        }) => {
          history.push({
            pathname,
            search: `?terms=${encodeURIComponent(
              terms.map(term => encodeURIComponent(term)).join(',')
            )}&preview=${encodeURIComponent(preview.map(p => encodeURIComponent(p)).join(','))}`,
          })
        },
      }}
    >
      {children}
    </UriStateContext.Provider>
  )
}
