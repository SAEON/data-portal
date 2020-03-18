import React, { useState, useEffect } from 'react'
import { DragMenu } from '../../components'
import { Typography } from '@material-ui/core'

const ATLAS_API_ADDRESS = process.env.ATLAS_API_ADDRESS || 'http://localhost:4000'

export default ({ title, onClose, uri }) => {
  const [state, setState] = useState({ loading: true, data: null, error: null })

  useEffect(() => {
    /**
     * TODO
     * Different layer types will have different logic for getting legend resources
     */
    async function _() {
      const response = await fetch(
        `${uri.replace(
          'https://pta-gis-2-web1.csir.co.za/server2/rest/services',
          `${ATLAS_API_ADDRESS}/csir`
        )}/legend?f=pjson`
      )
      const data = await response.json()
      setState(Object.assign({ ...state }, { loading: false, data }))
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
      {state.loading ? (
        <Typography>Loading ...</Typography>
      ) : (
        <>
          <div style={{ marginBottom: 10 }}>
            <Typography variant="overline">{title}</Typography>
          </div>
          {state.data.layers[0].legend.map((key, i) => (
            <div style={{ margin: '5px 0', display: 'flex' }} key={i}>
              <img style={{ display: 'flex' }} src={`data:image/png;base64, ${key.imageData}`} />
              <span style={{ display: 'flex', marginLeft: 'auto' }}>{key.label}</span>
            </div>
          ))}
        </>
      )}
    </DragMenu>
  )
}
