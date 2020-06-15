import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'

// TODO - change this to use a general http query hook

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
              }).then(res => res.json()),
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
        state.data.layers[0].legend.map((key, i) => (
          <div style={{ margin: '5px 0', display: 'flex' }} key={i}>
            <img style={{ display: 'flex' }} src={`data:image/png;base64, ${key.imageData}`} />
            <span style={{ display: 'flex', marginLeft: 'auto' }}>{key.label}</span>
          </div>
        ))
      )}
    </>
  )
}
