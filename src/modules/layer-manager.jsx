import { Component } from 'react'

export default class extends Component {
  constructor(props) {
    super(props)

    const reRender = this.reRender

    this.state = {
      render: 0,
      proxy: new Proxy(this.props.map, {
        get: function(map, prop) {
          // [layer]
          if (prop === 'layers')
            return new Proxy(map.getLayers().getArray(), {
              get: function(layers, i) {
                if (typeof i === 'symbol') return
                if (isNaN(parseInt(i))) return layers[i]

                // layer
                return new Proxy(
                  {},
                  {
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
                      layers[i].setOpacity(value)
                      reRender()
                      return true
                    }
                  }
                )
              }
            })

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
  }

  reRender = () => this.setState({ render: this.state.render + 1 })

  render() {
    const { proxy } = this.state
    return this.props.children({ proxy })
  }
}
