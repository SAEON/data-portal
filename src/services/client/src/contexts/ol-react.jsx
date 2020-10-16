import { createContext } from 'react'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap } from '../lib/ol'

export const MapContext = createContext()

export default ({ children }) => {
  return (
    <OlReact
      viewOptions={{
        center: [23, -29],
        zoom: 6.5,
      }}
      layers={[terrestrisBaseMap()]}
      style={{ width: '100%', height: '100%' }}
    >
      {({ map }) => (
        <MapProxy map={map}>
          {({ proxy }) => {
            return <MapContext.Provider value={{ map, proxy }}>{children}</MapContext.Provider>
          }}
        </MapProxy>
      )}
    </OlReact>
  )
}
