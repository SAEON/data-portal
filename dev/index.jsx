import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import { OlReact, SingleFeatureSelector, LayerManager, DragAndDrop } from '../src'
import { clusterSource } from './sources'
import {
  beehStormflow,
  beehStormflowCount,
  ahocevarBaseMap,
  cdngiAerial,
  clusterLayer
} from './layers'
import { clusterStyle1, clusterStyle2 } from './styles'
import './index.scss'
import pointData from './point-data.json'
var newPointData

const mapStyle = { width: '100%', height: '100%' }

class App extends PureComponent {
  constructor(props) {
    super(props)

    // Create layers
    this.clusteredSites = clusterSource({ data: pointData, locAttribute: 'location' })
    this.clusteredSitesLayer = clusterLayer({
      source: this.clusteredSites,
      id: 'sites',
      style: clusterStyle1
    })

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
      <OlReact style={mapStyle} viewOptions={this.viewOptions} layers={this.layers}>
        {({ map }) => (
          <>
            {/* A module that provides a means of selecting/deselecting a single feature */}
            <SingleFeatureSelector
              unselectedStyle={clusterStyle1}
              selectedStyle={clusterStyle2}
              map={map}
            >
              {({ selectedFeature, unselectFeature }) =>
                selectedFeature ? (
                  <div>
                    {/* Any OpenLayer Feature instance can be selected/deslected */}
                    <button onClick={unselectFeature}>Unselect feature</button>

                    {/* Deleting a feature is a little different - A Feature instance can be a group of features */}
                    {/* So first unselect the feature, then reset the layer */}
                    <button
                      onClick={() =>
                        unselectFeature(() => {
                          // First reset the source data
                          newPointData = (newPointData || pointData).filter(
                            p =>
                              !(selectedFeature.get('features') || [selectedFeature])
                                .map(f => f.get('id'))
                                .includes(p.id)
                          )

                          // Then reset the layer
                          this.clusteredSitesLayer.setSource(
                            clusterSource({
                              data: newPointData,
                              locAttribute: 'location'
                            })
                          )
                        })
                      }
                    >
                      Delete feature
                    </button>
                  </div>
                ) : (
                  ''
                )
              }
            </SingleFeatureSelector>

            {/* LayerManager provides map layers as an array */}
            {/* Updates to the array will reflect on the map (LayerManager 'ties' state of the array to the map) */}
            <LayerManager map={map}>
              {({ proxy }) => (
                <>
                  {/* This is how you add a server */}
                  <button
                    style={{ margin: '8px 8px 4px' }}
                    onClick={() => {
                      const uri = prompt(
                        'Enter WMS Server address',
                        'http://app01.saeon.ac.za:8082/geoserver/BEEH_shp/wms'
                      )
                      proxy.addServer(uri)
                    }}
                  >
                    Add server
                  </button>

                  {/* This is how you add a layer */}
                  <button
                    style={{ margin: '8px 8px 4px' }}
                    onClick={() => proxy.addLayer(cdngiAerial())}
                  >
                    Add layer
                  </button>

                  <DragAndDrop
                    layers={proxy.getLayers().getArray()}
                    reorderItems={result => {
                      if (!result.destination) return
                      const from = result.source.index
                      const to = result.destination.index
                      proxy.reorderLayers(from, to)
                    }}
                    listStyle={isDraggingOver => ({
                      background: isDraggingOver ? 'lightblue' : 'lightgrey',
                      padding: 8,
                      margin: 8
                    })}
                    itemStyle={(isDragging, draggableStyle) => ({
                      userSelect: 'none',
                      margin: `0 0 4px 0`,
                      padding: '4px',
                      background: isDragging ? 'lightgreen' : 'grey',
                      ...draggableStyle
                    })}
                  >
                    {(layers, makeDraggable) =>
                      layers.map((layer, i) =>
                        makeDraggable(
                          <div>
                            {layer.get('id')}
                            <span>({JSON.stringify(layer.get('visible'))})</span>
                            <button onClick={() => layer.setVisible(!layer.get('visible'))}>
                              Toggle visible
                            </button>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={layer.get('opacity') * 100}
                              onChange={e => layer.setOpacity(e.target.value / 100)}
                            />
                            <button onClick={() => proxy.removeLayer(layer)}>Remove layer</button>
                          </div>,
                          i
                        )
                      )
                    }
                  </DragAndDrop>
                </>
              )}
            </LayerManager>
          </>
        )}
      </OlReact>
    )
  }
}

render(<App />, document.getElementById('root'))
