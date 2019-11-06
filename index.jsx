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
          <LayerManager map={map}>
            {({ proxyLayers, layers, addLayer }) => (
              <>
                {/* This can be, but doesn't have to be a child of LayerManager */}
                {/* This way it has access to callbacks defined in LayerManager */}
                <SingleFeatureSelector map={map}>
                  {({ selectedFeature, unselectFeature }) =>
                    selectedFeature ? <button onClick={unselectFeature}>Click to close</button> : ''
                  }
                </SingleFeatureSelector>

                <ul>
                  <li>
                    <button onClick={() => addLayer(cdngiAerial())}>Add layer</button>
                  </li>
                  {proxyLayers.map((proxyLayer, i) => (
                    <li key={i}>
                      {proxyLayer.id}
                      <span>({JSON.stringify(proxyLayer.visible)})</span>
                      <button onClick={proxyLayer.toggleVisible}>Toggle visible</button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={proxyLayer.opacity * 100}
                        onChange={e => proxyLayer.updateOpacity(e.target.value / 100)}
                      />
                      <button onClick={proxyLayer.remove}>Remove layer</button>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </LayerManager>
        )}
      </Map>
    )
  }
}

render(<App />, document.getElementById('root'))
