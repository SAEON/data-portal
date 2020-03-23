import React, { useState, useEffect } from 'react'
import { DragMenu } from '../../components'
import { Typography } from '@material-ui/core'

export default ({ layer, onClose }) => {
  const [state, setState] = useState({ loading: true, data: null, error: null })
  const title = layer.get('title').truncate(50)
  const fetchLegend = layer.get('fetchLegend')
  const legendType = layer.get('legendType') || 'json'

  useEffect(() => {
    async function _() {
      if (fetchLegend) {
        setState(Object.assign({ ...state }, { loading: false, data: await fetchLegend() }))
      } else {
        setState(
          Object.assign(
            { ...state },
            {
              loading: false,
              data: null,
              error: 'No function for retrieving layer legend specified',
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
      title={'Legend'}
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
      ) : legendType === 'json' ? (
        state.data.layers[0].legend.map((key, i) => (
          <div style={{ margin: '5px 0', display: 'flex' }} key={i}>
            <img style={{ display: 'flex' }} src={`data:image/png;base64, ${key.imageData}`} />
            <span style={{ display: 'flex', marginLeft: 'auto' }}>{key.label}</span>
          </div>
        ))
      ) : legendType === 'image' ? (
        <img src={state.data} />
      ) : (
        'Unknown legend type'
      )}
    </DragMenu>
  )
}
