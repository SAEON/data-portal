import { PureComponent } from 'react'

const keys = ['id', 'title', 'visible', 'opacity']

export default class extends PureComponent {
  state = { proxyLayers: [] }

  constructor(props) {
    super(props)
    this.map = props.map
    this.map.getLayers().forEach(layer => {
      this.state.proxyLayers.push(Object.fromEntries(keys.map(key => [key, layer.get(key)])))
    })
  }

  getLayerById = id =>
    this.map
      .getLayers()
      .getArray()
      .find(layer => layer.get('id') === id)

  updateOpacity = (proxyLayer, opacity) => {
    const { id } = proxyLayer
    const layer = this.getLayerById(id)
    layer.setOpacity(opacity)
    this.updateProxyLayerState()
  }

  toggleVisible = proxyLayer => {
    const { id } = proxyLayer
    const layer = this.getLayerById(id)
    layer.setVisible(!layer.getVisible())
    this.updateProxyLayerState()
  }

  removeLayer = proxyLayer => {
    const { id } = proxyLayer
    const layer = this.getLayerById(id)
    this.map.removeLayer(layer)
    this.updateProxyLayerState()
  }

  addLayer = layer => {
    this.map.addLayer(layer)
    this.updateProxyLayerState()
  }

  updateProxyLayerState = () =>
    this.setState({
      proxyLayers: [...this.map.getLayers().getArray()].map(layer =>
        Object.fromEntries(keys.map(key => [key, layer.get(key)]))
      )
    })

  render() {
    const { proxyLayers: layers } = this.state
    const { updateOpacity, toggleVisible, removeLayer } = this
    return this.props.children({ layers, updateOpacity, toggleVisible, removeLayer })
  }
}
