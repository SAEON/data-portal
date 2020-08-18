import { useState, useCallback, useMemo } from 'react'
import LayerGroup from 'ol/layer/Group'
const packageJson = require('../../package.json')

const descriptor = {
  enumerable: false,
  configurable: false,
}

export default ({ map, children }) => {
  const [render, setRender] = useState()
  const reRender = useCallback(() => setRender(render + 1), [])

  const proxy = useMemo(() => {
    return new Proxy(
      Object.defineProperties(
        {},
        {
          reorderLayers: {
            ...descriptor,
            get: () => (startIndex, endIndex) => {
              const layers = Array.from(map.getLayers().getArray())
              const [removed] = layers.splice(startIndex, 1)
              layers.splice(endIndex, 0, removed)
              map.setLayerGroup(
                new LayerGroup({
                  layers: layers.map((layer, i, arr) => {
                    layer.setZIndex(arr.length - i)
                    return layer
                  }),
                })
              )
              reRender()
            },
          },

          getLayersByServerAddress: {
            ...descriptor,
            get: () => baseUri =>
              map
                .getLayers()
                .getArray()
                .filter(layer => (layer.getSource().urls || []).includes(baseUri)),
          },

          removeLayer: {
            ...descriptor,
            get: () => layer => {
              map.removeLayer(layer) || map.removeLayer(layer._self)
              reRender()
            },
          },

          removeLayerById: {
            ...descriptor,
            get: () => id => proxy.removeLayer(proxy.getLayerById(id)),
          },

          addInteraction: {
            ...descriptor,
            get: () => interaction => {
              map.addInteraction(interaction)
              reRender()
            },
          },

          removeInteraction: {
            ...descriptor,
            get: () => interaction => {
              map.removeInteraction(interaction)
              reRender()
            },
          },

          getLayerById: {
            ...descriptor,
            get: () => id =>
              map
                .getLayers()
                .getArray()
                .filter(layer => id === layer.get('id'))[0],
          },

          /**
           * Layers must have unique IDs
           */
          addLayer: {
            ...descriptor,
            get: () => layer => {
              if (
                map
                  .getLayers()
                  .getArray()
                  .map(layer => layer.get('id'))
                  .includes(layer.get('id'))
              ) {
                throw new Error(
                  `${packageJson.name} v${
                    packageJson.version
                  } ERROR: Cannot add layer with ID ${layer.get(
                    'id'
                  )} to the atlas since a layer with that ID already exists`
                )
              } else {
                map.setLayerGroup(
                  new LayerGroup({
                    layers: [layer, ...map.getLayerGroup().getLayers().getArray()].map(
                      (layer, i, arr) => {
                        layer.setZIndex(arr.length - i)
                        return layer
                      }
                    ),
                  })
                )
                reRender()
              }
            },
          },
          getLayers: {
            ...descriptor,
            get: () => () =>
              /**
               * OpenLayers.Collection proxy object
               */
              new Proxy(
                Object.defineProperties(
                  {},
                  {
                    _self: {
                      ...descriptor,
                      get: () => map.getLayers(),
                    },
                    getArray: {
                      ...descriptor,
                      get: () => () =>
                        /**
                         * [OpenLayer.Layer] proxy object
                         */
                        new Proxy(
                          map
                            .getLayers()
                            .getArray()
                            .map(
                              layer =>
                                new Proxy(
                                  /**
                                   * OpenLayer.Layer proxy object
                                   */
                                  Object.defineProperties(
                                    {},
                                    {
                                      _self: {
                                        ...descriptor,
                                        get: () => layer,
                                      },
                                      get: {
                                        ...descriptor,
                                        get: () => attribute => layer.get(attribute),
                                      },
                                    }
                                  ),
                                  {
                                    get: (proxiedTarget, prop) =>
                                      Object.prototype.hasOwnProperty.call(proxiedTarget, prop)
                                        ? proxiedTarget[prop]
                                        : typeof proxiedTarget._self[prop] === 'function'
                                        ? (...args) => {
                                            proxiedTarget._self[prop].apply(
                                              proxiedTarget._self,
                                              args
                                            )
                                            reRender()
                                          }
                                        : proxiedTarget._self[prop],
                                  }
                                )
                            ),

                          // getArray() proxy handler (proxies an array)
                          // Arrays as proxy objects are transparent
                          {
                            get: (target, prop) => target[prop],
                          }
                        ),
                    },
                  }
                ),

                // getLayers() proxy handler (proxies an OpenLayers Collection)
                {
                  get: (proxiedTarget, prop) =>
                    Object.prototype.hasOwnProperty.call(proxiedTarget, prop)
                      ? proxiedTarget[prop]
                      : typeof proxiedTarget[prop] === 'function'
                      ? (...args) => {
                          proxiedTarget._self[prop].apply(proxiedTarget._self, args)
                          reRender()
                        }
                      : proxiedTarget._self[prop],
                }
              ),
          },
        }
      ),

      // map proxy object (proxies the map object)
      {
        get: (target, prop) =>
          Object.prototype.hasOwnProperty.call(target, prop)
            ? target[prop]
            : typeof map[prop] === 'function'
            ? (...args) => map[prop].apply(map, args)
            : map[prop],
      }
    )
  }, [map])

  return children({ proxy })
}
