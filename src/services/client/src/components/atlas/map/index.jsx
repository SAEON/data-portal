import { useContext, useEffect } from 'react'
import { MapContext } from '../../../modules/provider-map'
import { AtlasContext } from '../state'
import { createLayer, LayerTypes } from '../../../lib/ol'

const MAX_AUTO_LAYERS = 5

export default () => {
  const { proxy } = useContext(MapContext)
  const { layers } = useContext(AtlasContext)

  /**
   * If there are only a few mapResources, add them to the Atlas as layers
   * Otherwise users need to pick layers for themselves. Adding too many
   * layers to the atlas may lead to bad performance
   */
  useEffect(() => {
    if (layers.length <= MAX_AUTO_LAYERS) {
      proxy.addLayers({
        layers: layers.map(({ uri, description: title, layerId, LAYERS }) => {
          return createLayer({
            layerType: LayerTypes.TileWMS,
            id: layerId,
            title,
            uri,
            LAYERS,
          })
        }),
        rerender: true,
      })
    }
  }, [layers, proxy])

  return null
}
