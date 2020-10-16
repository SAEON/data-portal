import { useContext, useEffect } from 'react'
import { MapContext } from '../../../contexts/ol-react'
import { AtlasContext } from '../state'
import { createLayer, LayerTypes } from '../../../lib/ol'
import SaeonGeoServerLegend from '../side-menu/tabs/data/layers/layer-types/saeon-geoserver/legend'

const MAX_AUTO_LAYERS = 1

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
      proxy.addLayers(
        layers.map(({ uri, title, description: layerTitle, layerId, LAYERS }) => {
          return createLayer({
            LegendMenu: () => (
              <SaeonGeoServerLegend
                uri={`${uri}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&TRANSPARENT=true&LAYER=${LAYERS}&LEGEND_OPTIONS=forceLabels:on`}
                title={title}
              />
            ),
            layerType: LayerTypes.TileWMS,
            id: layerId,
            title: layerTitle,
            uri,
            LAYERS,
          })
        })
      )
    }
  }, [layers, proxy])

  return null
}
