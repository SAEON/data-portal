import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import OlReact, { SingleFeatureSelector, MapProxy, DragAndDrop } from '../npm-package'
import { clusterSource } from './sources'
import { ahocevarBaseMap, clusterLayer, newLayer } from './layers'
import { clusterStyle1, clusterStyle2 } from './styles'
import './index.scss'
import pointData from './point-data.json'
import { Form } from './lib'
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
  }

  render() {
    return (
      <OlReact
        style={mapStyle}
        viewOptions={{}}
        layers={[ahocevarBaseMap(), this.clusteredSitesLayer]}
      >
        {({ map }) => (
          <>
            {/* TODO: I think for this to work with the proxy that features also need to be proxied? */}
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

            <MapProxy map={map}>
              {({ proxy, servers }) => (
                <Form visible={false}>
                  {({ updateForm, visible }) => (
                    <>
                      <button
                        style={{ margin: '8px 8px 4px' }}
                        onClick={() => updateForm({ visible: !visible })}
                      >
                        Toggle layer menu
                      </button>
                      <div
                        style={{
                          display: visible ? 'inherit' : 'none',
                          margin: '8px 8px 4px'
                        }}
                      >
                        {/* This is how you add a server */}
                        <button
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
                        <br />

                        <div style={{ marginTop: '8px' }}>
                          {/* Server toggle */}
                          <h1>Current servers</h1>
                          {Object.keys(servers).length > 0 ? (
                            Object.entries(servers).map(([uri, server], i) => (
                              <div key={i} style={{ padding: '8px', backgroundColor: 'grey' }}>
                                <button
                                  onClick={() => server.remove()}
                                  style={{ display: 'inline-block', marginRight: '8px' }}
                                >
                                  Remove server
                                </button>
                                <p style={{ margin: 0, display: 'inline-block' }}>{uri}</p>
                                <Form visible={false}>
                                  {({ updateForm, visible }) => (
                                    <>
                                      <button
                                        onClick={() => updateForm({ visible: !visible })}
                                        style={{ display: 'inline-block', marginLeft: '8px' }}
                                      >
                                        Toggle layer list (for this server)
                                      </button>
                                      <div
                                        style={
                                          visible
                                            ? { height: '200px', overflow: 'auto', margin: '8px' }
                                            : { display: 'none' }
                                        }
                                      >
                                        {server.Capability.Layer.Layer.map(({ Name }, i) => (
                                          <div key={i}>
                                            <p style={{ display: 'inline-block' }}>{Name}</p>
                                            <input
                                              checked={proxy.getLayerById(Name) ? true : false}
                                              onChange={({ target }) =>
                                                target.checked
                                                  ? proxy.addLayer(
                                                      newLayer({
                                                        id: Name,
                                                        url: server.wmsAddress,
                                                        name: Name
                                                      })
                                                    )
                                                  : proxy.removeLayerById(Name)
                                              }
                                              style={{ marginLeft: '8px' }}
                                              type="checkbox"
                                            />
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </Form>
                              </div>
                            ))
                          ) : (
                            <p>None</p>
                          )}

                          {/* Layer toggle */}
                          <h1>Current layers</h1>
                          {proxy.getLayers().getArray().length > 0 ? (
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
                                padding: 8
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
                                      <button
                                        onClick={() => layer.setVisible(!layer.get('visible'))}
                                      >
                                        Toggle visible
                                      </button>
                                      <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={layer.get('opacity') * 100}
                                        onChange={e => layer.setOpacity(e.target.value / 100)}
                                      />
                                      <button onClick={() => proxy.removeLayer(layer)}>
                                        Remove layer
                                      </button>
                                    </div>,
                                    i
                                  )
                                )
                              }
                            </DragAndDrop>
                          ) : (
                            <p>None</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </Form>
              )}
            </MapProxy>
          </>
        )}
      </OlReact>
    )
  }
}

render(<App />, document.getElementById('root'))
