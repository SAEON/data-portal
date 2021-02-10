import { OlReact } from '@saeon/ol-react'
import { terrestrisBaseMap, createLayer, LayerTypes } from '../../../../../../../lib/ol/layers'
import { parse } from 'url'
import { CATALOGUE_API_ADDRESS } from '../../../../../../../config'

const SPATIALDATA_PROXY = `${CATALOGUE_API_ADDRESS}/proxy/saeon-spatialdata`

export default ({ resourceURL, id, title }) => {
  const { pathname, hostname, port, query } = parse(resourceURL, true)
  const { layers: LAYERS } = query
  const layerId = `${id} - ${LAYERS}`
  const uri = `${SPATIALDATA_PROXY}/${hostname}/${port}${pathname}`

  return (
    <OlReact
      viewOptions={{
        center: [23, -29],
        zoom: 6.5,
      }}
      layers={[
        createLayer({ id: layerId, layerType: LayerTypes.TileWMS, title, uri, LAYERS }),
        terrestrisBaseMap(),
      ]}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
