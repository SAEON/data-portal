import { useState, useEffect } from 'react'

export default ({ uri, method, headers, body, children = null }) => {
  const [state, setState] = useState({
    error: false,
    loading: false,
    data: false,
  })

  useEffect(() => {
    var abortController = new AbortController()

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
          signal: abortController.signal,
        })

        const data = await response.json()

        setState({ error: false, loading: false, data })
      } catch (error) {
        setState({ error, loading: false, data: false })
      }
    })()

    return () => {
      abortController.abort()
    }
  }, [uri, method, headers, body])

  if (children) {
    return children(state)
  }

  return state
}
