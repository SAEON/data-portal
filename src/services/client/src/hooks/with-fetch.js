import { useState, useEffect } from 'react'

export default ({ uri, method, headers, body, children = null, signal = undefined }) => {
  const [state, setState] = useState({
    error: false,
    loading: false,
    data: false,
  })

  useEffect(() => {
    // eslint-disable-next-line
    ;(async () => {
      setState({ error: false, loading: true, data: false })
      try {
        const response = await fetch(uri, {
          method,
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify(body),
          headers,
          signal,
        })

        const data = await response.json()

        setState({ error: false, loading: false, data })
      } catch (error) {
        setState({ error, loading: false, data: false })
      }
    })()
  }, [uri, method, headers, body, signal])

  if (children) {
    return children(state)
  }

  return state
}
