import { Component } from 'react'
import LayerGroup from 'ol/layer/Group'

export default class extends Component {
  state = { render: 0 }

  constructor(props) {
    super(props)
    const { map } = this.props
    const reRender = this.reRender

    this.proxy = new Proxy(
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
          addLayer: {
            value: layer => {
              // TODO no duplicates allowed
              map.addLayer(layer)
              reRender()
            }
          },
          getLayers: {
            get() {
              return () =>
                new Proxy(
                  Object.defineProperties(
                    {},
                    {
                      getArray: {
                        get() {
                          return () =>
                            new Proxy(
                              map
                                .getLayers()
                                .getArray()
                                .map(
                                  layer =>
                                    new Proxy(
                                      Object.defineProperties(
                                        {},
                                        {
                                          _target: {
                                            value: layer
                                          },
                                          setOpacity: {
                                            value: num => {
                                              layer.setOpacity(num)
                                              reRender()
                                            }
                                          },
                                          setVisible: {
                                            value: bool => {
                                              layer.setVisible(bool)
                                              reRender()
                                            }
                                          },
                                          get: {
                                            get() {
                                              return attribute => layer.get(attribute)
                                            }
                                          }
                                        }
                                      ),
                                      {
                                        get: function(target, prop) {
                                          return target[prop]
                                        }
                                      }
                                    )
                                ),
                              {
                                get: function(target, prop) {
                                  return target[prop]
                                }
                              }
                            )
                        }
                      }
                    }
                  ),
                  {
                    get: function(target, prop) {
                      return target[prop]
                    }
                  }
                )
            }
          }
        }
      ),
      {
        get: function(target, prop) {
          return target[prop]
        }
      }
    )
  }

  reRender = () => this.setState({ render: this.state.render + 1 })

  render() {
    const { proxy } = this
    return this.props.children({ proxy })
  }
}
