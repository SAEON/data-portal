import { useState, useEffect, useCallback } from 'react'

const defaultState = {
  loading: true,
  error: null,
  data: null,
}

export default ({ uri, body, method = 'GET' }) => {
  body = typeof body === 'string' ? body : JSON.stringify(body)
  const [state, setState] = useState(defaultState)

  const fetchData = useCallback(
    async abortController => {
      try {
        const response = await fetch(uri, {
          body,
          signal: abortController?.signal,
          method,
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })

        const json = await response.json()

        if (json)
          setState({
            loading: false,
            error: null,
            data: json,
          })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({
            loading: false,
            error: error,
            data: null,
          })
        }
      }
    },
    [body, method, uri]
  )

  useEffect(() => {
    setState(defaultState)
    const abortController = new AbortController()
    fetchData(abortController)
    return () => abortController.abort()
  }, [uri, body, fetchData])

  return {
    loading: state.loading,
    error: state.error,
    data: state.data,
  }
}
