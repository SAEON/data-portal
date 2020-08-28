import descriptor from '../../lib/proxy-descriptor'

export default ({ map, rerender }) => {
  const _self = new Proxy(
    Object.defineProperties(
      {},
      {
        // TODO - this should not be getLayers, should rather be got by keys
        // Actually ... I'm not sure what this is doing
        _self: {
          ...descriptor,
          get: () => map.getLayers(),
        },

        // TODO I don't think the arrays needs to return a proxy
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
                    /**
                     * OpenLayer.Layer proxy object
                     */
                    new Proxy(
                      Object.defineProperties(
                        {},
                        {
                          _self: {
                            ...descriptor,
                            get: () => layer,
                          },
                          get: {
                            ...descriptor,
                            get: () => attribute => {
                              return layer.get(attribute)
                            },
                          },
                        }
                      ),
                      {
                        get: (proxy, property) => {
                          if (proxy.hasOwnProperty(property)) {
                            return proxy[property]
                          } else {
                            if (typeof proxy._self[property] === 'function') {
                              /**
                               * NOTE
                               * functions that are get*, should typically not require re-rendering
                               * functions that are set*, should typically require re-rendering
                               *
                               * If function is a 'getter', then return the value, otherwise rerender
                               */
                              return (...args) => {
                                if (property.match(/^set/)) {
                                  proxy._self[property].apply(proxy._self, args)

                                  rerender(r => r + 1)
                                } else {
                                  return proxy._self[property].apply(proxy._self, args)
                                }
                              }
                            } else {
                              return proxy._self[property]
                            }
                          }
                        },
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
      get: (proxy, property) => {
        if (proxy.hasOwnProperty(property)) {
          return proxy[property]
        } else {
          if (typeof proxy[property] === 'function') {
            if (property.match(/^get/)) {
              return (...args) => proxy._self[property].apply(proxy._self, args)
            } else {
              return (...args) => {
                proxy._self[property].apply(proxy._self, args)
                rerender(r => r + 1)
              }
            }
          } else {
            return proxy._self[property]
          }
        }
      },
    }
  )
  return _self
}
