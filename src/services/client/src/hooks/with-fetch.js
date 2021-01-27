import { useState, useEffect } from 'react'

export default ({ uri, method, headers, body, children = null, signal = undefined }) => {
  const [state, setState] = useState({
    error: false,
    loading: false,
    data: undefined,
  })

  useEffect(() => {
    // eslint-disable-next-line
    ;(async () => {
      setState({ error: false, loading: true, data: [] })
      try {
        const response = await fetch(uri, {
          method,
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify(body),
          headers,
          signal,
        })

        const text = await response.text()

        if (text.substring(0, 5) === 'ERROR') {
          setState({
            error: new Error(text.substring(5, text.length - 5)),
            loading: false,
            data: undefined,
          })
        } else {
          setState({ error: false, loading: false, data: JSON.parse(text) })
        }
      } catch (error) {
        console.error(error)
        setState({ error, loading: false, data: undefined })
      }
    })()
  }, [uri, method, headers, body, signal])

  if (children) {
    return children(state)
  }

  return state
}
