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
              {({ layerProxies, refreshLayerProxies, layers, addLayer }) => (
                <>
                  {/* Renders a drag/droppable list of provided children */}
                  <DragAndDrop
                    map={map}
                    listStyle={isDraggingOver => ({
                      background: isDraggingOver ? 'lightblue' : 'lightgrey',
                      padding: 4,
                      width: 1000
                    })}
                    itemStyle={(isDragging, draggableStyle) => ({
                      userSelect: 'none',
                      margin: `0 0 4px 0`,
                      padding: '4px',
                      background: isDragging ? 'lightgreen' : 'grey',
                      ...draggableStyle
                    })}
                    items={layerProxies}
                  >
                    {(items, makeDraggable) =>
                      items.map((item, i) =>
                        makeDraggable(
                          <div key={i}>
                            {item.id}
                            <span>({JSON.stringify(item.visible)})</span>
                            <button onClick={item.toggleVisible}>Toggle visible</button>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={item.opacity * 100}
                              onChange={e => item.updateOpacity(e.target.value / 100)}
                            />
                            <button onClick={item.remove}>Remove layer</button>
                          </div>,
                          i
                        )
                      )
                    }
                  </DragAndDrop>
                  <button onClick={() => addLayer(cdngiAerial())}>Add layer</button>
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
