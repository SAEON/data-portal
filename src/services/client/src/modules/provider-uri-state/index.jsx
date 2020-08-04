import React, { useState, createContext } from 'react'
import { useHistory } from 'react-router-dom'

export const UriStateContext = createContext()

const getStateFromUri = splitResult => {
  const url = window.location.href
  const regex = /[?&]([^=#]+)=([^&#]*)/g
  const params = {}

  var match
  while ((match = regex.exec(url))) {
    params[match[1]] = splitResult
      ? decodeURIComponent(match[2])
          .split(',')
          .map(item => decodeURIComponent(item))
          .filter(_ => _)
      : decodeURIComponent(match[2])
  }
  return params
}

export default ({ children }) => {
  const history = useHistory()
  const [c, setC] = useState(1)

  const triggerRender = () => setC(c + 1)

  return (
    <UriStateContext.Provider
      value={{
        getUriState: (splitTerms = true) => getStateFromUri(splitTerms),
        setUriState: ({ pathname = window.location.pathname, terms }) => {
          triggerRender()
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
