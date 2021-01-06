import addLayer from './_add-layer.js'
import addLayers from './_add-layers.js'
import reorderLayers from './_reorder-layers.js'
import getLayers from './_get-layers.js'
import getLayerById from './_get-layer-by-id.js'
import removeLayerById from './_remove-layer-by-id.js'
import removeLayer from './_remove-layer.js'
import addInteraction from './_add-interaction.js'
import removeInteraction from './_remove-interaction.js'

/**
 * Function that returns a proxy of an ol/Map instance
 */
export default ({ map, rerender }) => {
  const _self = {}

  const proxy = new Proxy(
    Object.defineProperties(
      /**
       * ol/Map proxy target
       */
      _self,

      /**
       * ol/Map proxy target properties
       */
      {
        addLayer: addLayer(_self),
        addLayers: addLayers(map, rerender),
        reorderLayers: reorderLayers(map, rerender),
        removeLayerById: removeLayerById(_self),
        removeLayer: removeLayer(map, rerender),
        addInteraction: addInteraction(map, rerender),
        removeInteraction: removeInteraction(map, rerender),
        getLayerById: getLayerById(map),
        getLayers: getLayers(map, rerender),
      }
    ),

    /**
     * ol/Map proxy handler
     */
    {
      get: (proxy, property) => {
        if (proxy.hasOwnProperty(property)) {
          return proxy[property]
        } else {
          if (typeof map[property] === 'function') {
            if (property.match(/^get/)) {
              return (...args) => map[property].apply(map, args)
            } else {
              return (...args) => {
                map[property].apply(map, args)
                rerender(r => r + 1)
              }
            }
          } else {
            return map[property]
          }
        }
      },
    }
  )

  return proxy
}
