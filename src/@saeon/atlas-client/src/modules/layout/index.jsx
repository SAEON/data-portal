import React from 'react'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap } from '../../lib/ol'
import AppLayout from './_app-layout'

export default () => (
  <div style={{ height: 'calc(100% - 42px)', width: '100%' }}>
    <OlReact
      viewOptions={{
        center: [32, -15],
        zoom: 4.6
      }}
      layers={[terrestrisBaseMap()]}
      style={{ width: '100%', height: '100%' }}
    >
      {({ map }) => <MapProxy map={map}>{({ proxy }) => <AppLayout proxy={proxy} />}</MapProxy>}
    </OlReact>
  </div>
)
