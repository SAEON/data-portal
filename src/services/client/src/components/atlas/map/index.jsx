import React, { useContext } from 'react'
import { MapContext } from '../../../modules/provider-map'
import { AtlasContext } from '../state'
import { createLayer, LayerTypes } from '../../../lib/ol'
import npmUrl from 'url'
import { CATALOGUE_API_ADDRESS } from '../../../config'

const SPATIALDATA_PROXY = `${CATALOGUE_API_ADDRESS}/proxy/saeon-spatialdata`

const MAX_AUTO_LAYERS = 5

export default () => {
  console.log('rendring map')
  const { map, proxy } = useContext(MapContext)
  const { layers } = useContext(AtlasContext)

  /**
   * If there are only a few mapResources, add them to the Atlas as layers
   * Otherwise users need to pick layers for themselves. Adding too many
   * layers to the atlas may lead to bad performance
   */
  if (layers.length <= MAX_AUTO_LAYERS) {
    layers.forEach(({ uri, id, description: title }) => {
      uri = npmUrl.parse(uri, true)
      const { pathname, query, port, hostname } = uri
      const { layers } = query
      const layerId = `${id} - ${layers}`

      const serverAddress = `${SPATIALDATA_PROXY}/${hostname}/${port}${pathname}`

      if (!proxy.getLayerById(layerId)) {
        proxy.addLayer(
          createLayer({
            layerType: LayerTypes.TileWMS,
            id: layerId,
            title,
            uri: serverAddress,
            LAYERS: layers,
          })
        )
      }
    })
  }

  return <div>hi</div>
}
