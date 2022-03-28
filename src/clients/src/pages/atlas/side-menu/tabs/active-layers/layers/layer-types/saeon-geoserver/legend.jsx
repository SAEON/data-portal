import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'

export default ({ title, uri }) => {
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null
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
                signal: abortFetch.signal
              })
                .then(res => res.blob())
                .then(blob => URL.createObjectURL(blob))
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
            error: err.message
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
      <div style={{ margin: 16, textAlign: 'center' }}>
        <Typography variant="body2">{title}</Typography>
      </div>
      <div style={{ margin: 16 }}>
        {state.loading ? (
          <Typography>Loading ...</Typography>
        ) : state.error ? (
          <Typography>{state.error}</Typography>
        ) : (
          <img src={state.data} />
        )}
      </div>
    </>
  )
}
