import React, { PureComponent, createContext } from 'react'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap } from '../../lib/ol'

export const MapContext = createContext()

export default class extends PureComponent {
  render() {
    const { children } = this.props
    return (
      <div style={{ height: 'calc(100% - 42px)', width: '100%' }}>
        <OlReact
          viewOptions={{
            center: [32, -15],
            zoom: 4.6
          }}
          layers={[terrestrisBaseMap()]}
          style={{ width: '100%', height: '100%' }}
        >
          {({ map }) => (
            <MapProxy map={map}>
              {({ proxy }) => (
                <MapContext.Provider value={{ map, proxy }}>{children}</MapContext.Provider>
              )}
            </MapProxy>
          )}
        </OlReact>
      </div>
    )
  }
}
