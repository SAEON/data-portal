import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import { Map, ahocevarBaseMap, clusterLayer, clusterSource, SingleFeatureSelector } from './src'
import './index.scss'
import pointData from './point-data.json'

class App extends PureComponent {
  constructor(props) {
    super(props)

    // Create layers
    this.clusteredSites = clusterSource({ data: pointData, locAttribute: 'location' })
    this.clusteredSitesLayer = clusterLayer(this.clusteredSites, 'sites')
    this.layers = [ahocevarBaseMap, this.clusteredSitesLayer]
  }

  render() {
    return (
      <Map
        style={{ width: '100%', height: '100%' }}
        viewOptions={this.viewOptions}
        layers={this.layers}
      >
        {({ map }) => (
          <SingleFeatureSelector map={map}>
            {({ selectedFeature, unselectFeature }) =>
              selectedFeature ? <div>popup component goes here!</div> : ''
            }
          </SingleFeatureSelector>
        )}
      </Map>
    )
  }
}

render(<App />, document.getElementById('root'))
