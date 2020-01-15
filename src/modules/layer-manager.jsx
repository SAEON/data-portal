import { PureComponent } from 'react'
import LayerGroup from 'ol/layer/Group'
import { WMSCapabilities } from 'ol/format'

const wmsParser = new WMSCapabilities()

const descriptor = {
  enumerable: false,
  configurable: false
}

export default class extends PureComponent {
  state = {
    servers: {},
    render: 0
  }

  constructor(props) {
    super(props)
    const { map } = this.props
    const reRender = this.reRender
    const proxy = new Proxy(
      // Map proxy object
      Object.defineProperties(
        {},
        {
          reorderLayers: {
            ...descriptor,
            get: () => (startIndex, endIndex) => {
              const layers = Array.from(map.getLayers().getArray())
              const [removed] = layers.splice(startIndex, 1)
              layers.splice(endIndex, 0, removed)
              map.setLayerGroup(new LayerGroup({ layers }))
              reRender()
            }
          },

          addServer: {
            ...descriptor,
            get: () => async baseUri =>
              this.setState({
                servers: Object.assign(
                  {
                    [baseUri]: await fetch(
                      `${baseUri}?service=wms&request=GetCapabilities&version=1.3.0`
                    )
                      .then(res => res.text())
                      .then(txt => wmsParser.read(txt))
                      .then(
                        wms =>
                          new Proxy(
                            Object.defineProperties(wms, {
                              wmsAddress: {
                                get: () => baseUri
                              },
                              remove: {
                                get: () => () => {
                                  // Delete layers from map
                                  proxy
                                    .getLayersByServerAddress(baseUri)
                                    .forEach(layer => map.removeLayer(layer))

                                  // Then register the server as deleted
                                  this.setState({
                                    servers: Object.fromEntries(
                                      Object.entries(this.state.servers).filter(
                                        ([uri]) => uri !== baseUri
                                      )
                                    )
                                  })
                                }
                              }
                            }),
                            {
                              get: (target, value) => target[value]
                            }
                          )
                      )
                  },
                  { ...this.state.servers }
                )
              })
          },

          getLayersByServerAddress: {
            ...descriptor,
            get: () => baseUri =>
              map
                .getLayers()
                .getArray()
                .filter(layer => (layer.getSource().urls || []).includes(baseUri))
          },

          removeLayer: {
            ...descriptor,
            get: () => layer => {
              map.removeLayer(layer) || map.removeLayer(layer._self)
              reRender()
            }
          },

          removeLayerById: {
            ...descriptor,
            get: () => id => proxy.removeLayer(proxy.getLayerById(id))
          },

          getLayerById: {
            ...descriptor,
            get: () => id =>
              map
                .getLayers()
                .getArray()
                .filter(layer => id === layer.get('id'))[0]
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
                  `@saeon/atlas. Cannot add layer with ID ${layer.get(
                    'id'
                  )} to the atlas since a layer with that ID already exists`
                )
              } else {
                map.addLayer(layer)
                reRender()
              }
            }
          },
          getLayers: {
            ...descriptor,
            get: () => () =>
              new Proxy(
                // Collection proxy object
                Object.defineProperties(
                  {},
                  {
                    _self: {
                      ...descriptor,
                      get: () => map.getLayers()
                    },
                    getArray: {
                      ...descriptor,
                      get: () => () =>
                        new Proxy(
                          map
                            .getLayers()
                            .getArray()
                            .map(
                              layer =>
                                new Proxy(
                                  // Layer proxy object
                                  Object.defineProperties(
                                    {},
                                    {
                                      _self: {
                                        ...descriptor,
                                        get: () => layer
                                      },
                                      get: {
                                        ...descriptor,
                                        get: () => attribute => layer.get(attribute)
                                      }
                                    }
                                  ),
                                  {
                                    get: (proxiedTarget, prop) =>
                                      proxiedTarget.hasOwnProperty(prop)
                                        ? proxiedTarget[prop]
                                        : typeof proxiedTarget._self[prop] === 'function'
                                        ? (...args) => {
                                            proxiedTarget._self[prop].apply(proxiedTarget._self, [
                                              ...args
                                            ])
                                            reRender()
                                          }
                                        : proxiedTarget._self[prop]
                                  }
                                )
                            ),

                          // getArray() proxy handler (proxies an array)
                          // Arrays as proxy objects are transparent
                          {
                            get: (target, prop) => target[prop]
                          }
                        )
                    }
                  }
                ),

                // getLayers() proxy handler (proxies an OpenLayers Collection)
                {
                  get: (proxiedTarget, prop) =>
                    proxiedTarget.hasOwnProperty(prop)
                      ? proxiedTarget[prop]
                      : typeof proxiedTarget[prop] === 'function'
                      ? (...args) => {
                          proxiedTarget._self[prop].apply(proxiedTarget._self, [...args])
                          reRender()
                        }
                      : proxiedTarget._self[prop]
                }
              )
          }
        }
      ),

      // map proxy object (proxies the map object)
      {
        get: (target, prop) =>
          target.hasOwnProperty(prop)
            ? target[prop]
            : typeof map[prop] === 'function'
            ? (...args) => {
                map[prop].apply(map, [...args])
                reRender()
              }
            : map[prop]
      }
    )

    this.proxy = proxy
  }

  reRender = () => this.setState({ render: this.state.render + 1 })

  render() {
    const { proxy } = this
    const { servers } = this.state
    return this.props.children({ proxy, servers })
  }
}
