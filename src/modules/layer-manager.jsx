import { PureComponent } from 'react'

const keys = ['id', 'title', 'visible', 'opacity']

export default class extends PureComponent {
  state = { proxyLayers: [] }

  constructor(props) {
    super(props)
    this.map = props.map
  }

  componentDidMount() {
    this.refreshProxyLayers()
  }

  refreshProxyLayers = () => {
    const proxyLayers = []
    this.map.getLayers().forEach(layer => {
      const proxyLayer = Object.fromEntries(keys.map(key => [key, layer.get(key)]))

      Object.defineProperties(proxyLayer, {
        toggleVisible: {
          value: () => {
            layer.setVisible(!layer.getVisible())
            this.refreshProxyLayers()
          }
        },
        updateOpacity: {
          value: val => {
            layer.setOpacity(val)
            this.refreshProxyLayers()
          }
        },
        remove: {
          value: () => {
            this.map.removeLayer(layer)
            this.refreshProxyLayers()
          }
        }
      })

      proxyLayers.push(proxyLayer)
    })
    this.setState({ proxyLayers })
  }

  addLayer = layer => {
    this.map.addLayer(layer)
    this.refreshProxyLayers()
  }

  render() {
    const layers = this.map.getLayers()
    const { proxyLayers } = this.state
    const { addLayer } = this
    return this.props.children({ proxyLayers, layers, addLayer })
  }
}
