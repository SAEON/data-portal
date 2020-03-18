import React, { useState, useEffect } from 'react'
import { DragMenu } from '../../components'
import JSONTree from 'react-json-tree'
import { Typography } from '@material-ui/core'

const ATLAS_API_ADDRESS = process.env.ATLAS_API_ADDRESS || 'http://localhost:4000'

export default ({ title, uri, onClose }) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null
  })

  useEffect(() => {
    async function _() {
      const response = await fetch(
        `${uri.replace(
          'https://pta-gis-2-web1.csir.co.za/server2/rest/services',
          `${ATLAS_API_ADDRESS}/csir`
        )}/layers?f=pjson`
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
      title={'Layer info'}
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
        </>
      )}
    </DragMenu>
  )
}
