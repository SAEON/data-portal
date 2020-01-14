import { PureComponent } from 'react'
import LayerGroup from 'ol/layer/Group'
import { WMSCapabilities } from 'ol/format'

const wmsParser = new WMSCapabilities()

export default class extends PureComponent {
  state = {
    servers: {},
    render: 0
  }

  constructor(props) {
    super(props)
    const { map } = this.props
    const reRender = this.reRender

    this.proxy = new Proxy(
      // Map proxy object
      Object.defineProperties(
        {},
        {
          reorderLayers: {
            value: (startIndex, endIndex) => {
              const layers = Array.from(map.getLayers().getArray())
              const [removed] = layers.splice(startIndex, 1)
              layers.splice(endIndex, 0, removed)
              map.setLayerGroup(new LayerGroup({ layers }))
              reRender()
            }
          },
          removeLayer: {
            value: layer => {
              map.removeLayer(layer._target)
              reRender()
            }
          },

          addServer: {
            value: async baseUri =>
              this.setState({
                servers: Object.assign(
                  {
                    [baseUri]: await fetch(
                      `${baseUri}?service=wms&request=GetCapabilities&version=1.3.0`
                    )
                      .then(res => res.text())
                      .then(txt => wmsParser.read(txt))
                  },
                  { ...this.state.servers }
                )
              })
          },

          /**
           * Layers must have unique IDs
           */
          addLayer: {
            value: layer => {
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
            get: () => () =>
              new Proxy(
                // Collection proxy object
                Object.defineProperties(
                  {},
                  {
                    _target: {
                      value: map.getLayers()
                    },
                    getArray: {
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
                                      _target: {
                                        value: layer
                                      },
                                      get: {
                                        get: () => attribute => layer.get(attribute)
                                      }
                                    }
                                  ),
                                  {
                                    get: (target, prop) =>
                                      target.hasOwnProperty(prop)
                                        ? target[prop]
                                        : typeof target._target[prop] === 'function'
                                        ? (...args) => {
                                            target._target[prop].apply(target._target, [...args])
                                            reRender()
                                          }
                                        : target._target[prop]
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
                  get: (target, prop) =>
                    target.hasOwnProperty(prop)
                      ? target[prop]
                      : typeof target[prop] === 'function'
                      ? (...args) => {
                          target._target[prop].apply(target._target, [...args])
                          reRender()
                        }
                      : target._target[prop]
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
  }

  reRender = () => this.setState({ render: this.state.render + 1 })

  render() {
    const { proxy } = this
    return this.props.children({ proxy })
  }
}
