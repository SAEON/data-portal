import { PureComponent } from 'react'

const keys = ['id', 'title', 'visible', 'opacity']

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
          value: () => {
            layer.setVisible(!layer.getVisible())
            this.refreshLayerProxies()
          }
        },
        updateOpacity: {
          value: val => {
            layer.setOpacity(val)
            this.refreshLayerProxies()
          }
        },
        remove: {
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
    const { addLayer } = this
    return this.props.children({ layerProxies, layers, addLayer })
  }
}
