import { PureComponent } from 'react'

const keys = ['id', 'title', 'visible', 'opacity']

const descriptorProperties = {
  writable: false,
  configurable: false,
  enumerable: false
}

export default class extends PureComponent {
  state = { layerProxies: [] }

  constructor(props) {
    super(props)
    this.map = props.map
  }

  componentDidMount() {
    this.refreshLayerProxies()
  }

  refreshLayerProxies = () => {
    const layerProxies = []
    this.map.getLayers().forEach(layer => {
      const layerProxy = Object.fromEntries(keys.map(key => [key, layer.get(key)]))

      Object.defineProperties(layerProxy, {
        toggleVisible: {
          ...descriptorProperties,
          value: () => {
            layer.setVisible(!layer.getVisible())
            this.refreshLayerProxies()
          }
        },
        updateOpacity: {
          ...descriptorProperties,
          value: val => {
            layer.setOpacity(val)
            this.refreshLayerProxies()
          }
        },
        remove: {
          ...descriptorProperties,
          value: () => {
            this.map.removeLayer(layer)
            this.refreshLayerProxies()
          }
        }
      })

      layerProxies.push(layerProxy)
    })
    this.setState({ layerProxies })
  }

  addLayer = layer => {
    this.map.addLayer(layer)
    this.refreshLayerProxies()
  }

  render() {
    const layers = this.map.getLayers()
    const { layerProxies } = this.state
    const { refreshLayerProxies, addLayer } = this
    return this.props.children({ layerProxies, layers, addLayer, refreshLayerProxies })
  }
}
