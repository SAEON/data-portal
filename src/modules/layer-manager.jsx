import { Component } from 'react'
import LayerGroup from 'ol/layer/Group'

export default class extends Component {
  state = { render: 0 }

  constructor(props) {
    super(props)

    const reRender = this.reRender

    this.proxy = new Proxy(this.props.map, {
      get: function(map, prop) {
        // [layer]
        if (prop === 'layers')
          return new Proxy(map.getLayers().getArray(), {
            get: function(layers, i) {
              if (typeof i === 'symbol') return
              if (isNaN(parseInt(i))) return layers[i]

              // layer (indentified by layer.id)
              return new Proxy(new String(layers[i].get('id')), {
                get: function(_, attribute) {
                  if (['id', 'title', 'visible', 'opacity'].includes(attribute))
                    return layers[i].get(attribute)

                  if (attribute === 'toggleVisible')
                    return () => {
                      layers[i].setVisible(!layers[i].getVisible())
                      reRender()
                    }

                  if (attribute === 'removeLayer')
                    return () => {
                      map.removeLayer(layers[i])
                      reRender()
                    }
                },
                set: function(_, attribute, value) {
                  if (attribute === 'opacity') {
                    layers[i].setOpacity(value)
                    reRender()
                    return true
                  }

                  return false
                }
              })
            }
          })

        if (prop === 'reorderLayers')
          return (startIndex, endIndex) => {
            const layers = Array.from(map.getLayers().getArray())
            const [removed] = layers.splice(startIndex, 1)
            layers.splice(endIndex, 0, removed)
            map.setLayerGroup(new LayerGroup({ layers }))
            reRender()
          }

        if (prop === 'addLayer')
          return layer => {
            map.addLayer(layer)
            reRender()
          }

        // Return the map object
        return map[prop]
      }
    })
  }

  reRender = () => this.setState({ render: this.state.render + 1 })

  render() {
    const { proxy } = this
    return this.props.children({ proxy })
  }
}
