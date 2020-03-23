import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'

export default ({ title, uri }) => {
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  })

  useEffect(() => {
    const abortFetch = new AbortController()
    async function _() {
      try {
        setState(
          Object.assign(
            { ...state },
            {
              loading: false,
              data: await fetch(uri, {
                signal: abortFetch.signal,
              })
                .then((res) => res.blob())
                .then((blob) => URL.createObjectURL(blob)),
            }
          )
        )
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted')
        } else {
          console.error('Error', err)
          setState({
            loading: false,
            error: err.message,
          })
        }
      }
    }

    _()
    // Cleanup
    return () => abortFetch.abort()
  }, [])

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <Typography variant="overline">{title}</Typography>
      </div>
      {state.loading ? (
        <Typography>Loading ...</Typography>
      ) : state.error ? (
        <Typography>{state.error}</Typography>
      ) : (
        <img src={state.data} />
      )}
    </>
  )
}
