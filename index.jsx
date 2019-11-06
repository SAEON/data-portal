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
  LayerManager
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
            <LayerManager map={map}>
              {({ layers, updateOpacity, toggleVisible, removeLayer }) => (
                <ul>
                  {layers.map((layer, i) => (
                    <li key={i}>
                      {layer.id}
                      <span>({JSON.stringify(layer.visible)})</span>
                      <button onClick={() => toggleVisible(layer)}>Toggle visible</button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={layer.opacity * 100}
                        onChange={e => updateOpacity(layer, e.target.value / 100)}
                      />
                      <button onClick={() => removeLayer(layer)}>Remove layer</button>
                    </li>
                  ))}
                </ul>
              )}
            </LayerManager>
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
