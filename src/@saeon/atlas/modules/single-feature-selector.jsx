import { PureComponent } from 'react'
import { debounce } from '../../../_lib'
export default class extends PureComponent {
  state = { selectedFeature: null, selectedLayer: null }

  constructor(props) {
    super(props)
    this.map = this.props.map
  }

  componentDidMount() {
    // Pointer cursor
    this.map.on(
      'pointermove',
      debounce(e => {
        const hit = this.map.forEachFeatureAtPixel(e.pixel, () => true) || false
        e.target.getTarget().style.cursor = hit ? 'pointer' : ''
      }, 3)
    )

    // Add click handler
    this.map.on('click', e => {
      if (this.props.ignoreClicks) return
      const { unselectedStyle, selectedStyle } = this.props
      const { selectedFeature } = this.state
      const { feature, layer } =
        this.map.forEachFeatureAtPixel(e.pixel, (feature, layer) => ({
          feature,
          layer
        })) || {}
      if (selectedFeature) selectedFeature.setStyle(unselectedStyle(selectedFeature))
      if (feature && feature !== selectedFeature) {
        this.setState(
          {
            selectedFeature: feature,
            selectedLayer: layer
          },
          () => {
            const { selectedFeature } = this.state
            selectedFeature.setStyle(selectedStyle(feature))
          }
        )
      } else {
        if (selectedFeature) this.unselectFeature()
      }
    })
  }

  unselectFeature = (cb = null) => {
    // This function is often called with an event object. which is not a function
    if (typeof cb !== 'function') cb = null

    if (this.props.ignoreClicks) return
    const { unselectedStyle } = this.props
    this.state.selectedFeature.setStyle(unselectedStyle(this.state.selectedFeature))
    this.setState({ selectedFeature: null, selectedLayer: null }, cb)
  }

  render() {
    const { selectedFeature } = this.state
    const { unselectFeature } = this
    return this.props.children({ selectedFeature, unselectFeature })
  }
}
