import React, { useState, useEffect, createContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export const UriStateContext = createContext()

const getUriState = ({ splitString = false } = {}) => {
  const url = window.location.href
  const regex = /[?&]([^=#]+)=([^&#]*)/g
  const params = {}

  var match
  while ((match = regex.exec(url))) {
    params[match[1]] = splitString
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
  const [state, setState] = useState(getUriState({ splitString: false }))

  useEffect(() => {
    setState(getUriState({ splitString: false }))
  }, [location])

  return (
    <UriStateContext.Provider
      value={{
        state,
        getUriState,
        setUriState: ({
          pathname = window.location.pathname,
          text = getUriState({ splitString: false }).text || '',
          terms = getUriState({ splitString: true }).terms?.map(term => JSON.parse(term)) || [],
          layers = getUriState({ splitString: true }).layers || [],
          extent = getUriState({ splitString: false }).extent || '',
        }) => {
          text = encodeURIComponent(text)
          layers = encodeURIComponent(layers.map(p => encodeURIComponent(p)).join(','))
          extent = encodeURIComponent(extent)
          terms = encodeURIComponent(
            terms.map(term => encodeURIComponent(JSON.stringify(term))).join(',')
          )

          history.push({
            pathname,
            search: `?terms=${terms}&extent=${extent}&text=${text}&layers=${layers}`,
          })
        },
      }}
    >
      {children}
    </UriStateContext.Provider>
  )
}
