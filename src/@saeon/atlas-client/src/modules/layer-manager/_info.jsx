import React, { useState, useEffect } from 'react'
import { DragMenu } from '../../components'
import JSONTree from 'react-json-tree'
import { Typography } from '@material-ui/core'

export default ({ layer, onClose }) => {
  const title = layer.get('title').truncate(50)
  const fetchInfo = layer.get('fetchInfo')

  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  })

  useEffect(() => {
    async function _() {
      if (fetchInfo) {
        setState(Object.assign({ ...state }, { loading: false, data: await fetchInfo() }))
      } else {
        setState(
          Object.assign(
            { ...state },
            {
              loading: false,
              data: null,
              error: 'No function for retrieving layer information specified'
            }
          )
        )
      }
    }
    _()
  }, [])

  return (
    <DragMenu
      onMouseDown={() => console.log('update zIndex todo')}
      zIndex={99}
      defaultPosition={{ x: 650, y: 25 }}
      width={200}
      title={'Layer info'}
      active={true}
      close={onClose}
    >
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
            base0F: '#7a2d00'
          }}
          data={state.data}
        />
      )}
    </DragMenu>
  )
}
