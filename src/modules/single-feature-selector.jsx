import { PureComponent } from 'react'
import { clusterStyle, clusterStyle2 } from '../open-layers'

export default class extends PureComponent {
  state = { selectedFeature: null }

  constructor(props) {
    super(props)
    this.map = this.props.map
  }

  componentDidMount() {
    // Pointer cursor
    this.map.on('pointermove', e => {
      const hit = this.map.forEachFeatureAtPixel(e.pixel, () => true) || false
      e.target.getTarget().style.cursor = hit ? 'pointer' : ''
    })

    // Add click handler
    this.map.on('click', e => {
      const { selectedFeature } = this.state
      const feature = this.map.forEachFeatureAtPixel(e.pixel, feature => feature)
      if (selectedFeature) selectedFeature.setStyle(clusterStyle(selectedFeature))
      if (feature && feature !== selectedFeature) {
        this.setState({ selectedFeature: feature }, () => {
          const { selectedFeature } = this.state
          selectedFeature.setStyle(clusterStyle2(feature))
        })
      } else {
        if (selectedFeature) this.unselectFeature()
      }
    })
  }

  unselectFeature() {
    this.state.selectedFeature.setStyle(clusterStyle(this.state.selectedFeature))
    this.setState({ selectedFeature: null })
  }

  render() {
    const { selectedFeature } = this.state
    const { unselectFeature } = this
    return this.props.children({ selectedFeature, unselectFeature })
  }
}
