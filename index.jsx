import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import {
  Map,
  ahocevarBaseMap,
  cdngiAerial,
  beehStormflow,
  beehStormflowCount,
  clusterLayer,
  clusterSource,
  SingleFeatureSelector,
  LayerSwitcher
} from './src'
import './index.scss'
import pointData from './point-data.json'

const mapStyle = { width: '100%', height: '100%' }

class App extends PureComponent {
  constructor(props) {
    super(props)

    // Create layers
    this.clusteredSites = clusterSource({ data: pointData, locAttribute: 'location' })
    this.clusteredSitesLayer = clusterLayer(this.clusteredSites, 'sites')

    /**
     * This array is passed to the OpenLayers Map constructor
     * new Map({ ... layers: this.layers ...})
     * https://openlayers.org/en/latest/apidoc/module-ol_Map-Map.html
     */
    this.layers = [
      ahocevarBaseMap(),
      cdngiAerial(),
      beehStormflow(),
      beehStormflowCount(),
      this.clusteredSitesLayer
    ]

    /**
     * This object is passed to the OpenLayers View constructor
     * new View(this.viewOptions)
     * https://openlayers.org/en/latest/apidoc/module-ol_View-View.html
     */
    this.viewOptions = {}
  }

  render() {
    return (
      <Map style={mapStyle} viewOptions={this.viewOptions} layers={this.layers}>
        {({ map }) => (
          <>
            <LayerSwitcher>{({}) => 'hi'}</LayerSwitcher>
            <SingleFeatureSelector map={map}>
              {({ selectedFeature, unselectFeature }) =>
                selectedFeature ? <button onClick={unselectFeature}>Click to close</button> : ''
              }
            </SingleFeatureSelector>
          </>
        )}
      </Map>
    )
  }
}

render(<App />, document.getElementById('root'))
