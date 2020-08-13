import React, { useState, useEffect, useCallback } from 'react'
import JSONTree from 'react-json-tree'
import { Typography } from '@material-ui/core'

export default ({ title, uri }) => {
  const [state, setState] = useState({
    error: null,
    loading: true,
    data: null,
  })

  const fetchData = useCallback(
    async abortFetch => {
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
    },
    [uri, state]
  )

  useEffect(() => {
    const abortFetch = new AbortController()
    fetchData(abortFetch)
    return () => abortFetch.abort()
  }, [fetchData])

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
        <JSONTree
          invertTheme={true}
          theme={{
            scheme: 'pop',
            author: 'chris kempson (http://chriskempson.com)',
            base00: '#000000',
            base01: '#202020',
            base02: '#303030',
            base03: '#505050',
            base04: '#b0b0b0',
            base05: '#d0d0d0',
            base06: '#e0e0e0',
            base07: '#ffffff',
            base08: '#eb008a',
            base09: '#f29333',
            base0A: '#f8ca12',
            base0B: '#37b349',
            base0C: '#00aabb',
            base0D: '#0e5a94',
            base0E: '#b31e8d',
            base0F: '#7a2d00',
          }}
          data={state.data}
        />
      )}
    </>
  )
}
