import React, { Component } from 'react'
import { TextField, Grid, Typography, Card, CardHeader, Checkbox } from '@material-ui/core'
import { Form } from '../../components'
import { Search as SearchIcon } from '@material-ui/icons'
import npmUrl from 'url'
import { VirtualList } from '../../components'
import { Alert } from '@material-ui/lab'
import { createLayer, LayerTypes } from '../../lib/ol'
import LegendMenu from './_legend-menu'
import { ReactCatalogue } from '@saeon/catalogue-search'

const DSL_PROXY = `${
  process.env.ATLAS_API_ADDRESS || 'http://localhost:4000'
}/proxy/saeon-elk/_search`

const DSL_INDEX = `saeon-odp-4-2`

const SPATIALDATA_PROXY = `${
  process.env.ATLAS_API_ADDRESS || 'http://localhost:4000'
}/proxy/saeon-spatialdata`

export default ({ height, width, proxy }) => (
  <Form search="">
    {({ updateForm, search }) => (
      <Grid container spacing={3}>
        {/* Search controls */}
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item>
              <TextField
                id="saeon-ckan-search"
                label="Search"
                autoComplete="off"
                value={search}
                onChange={({ target }) => updateForm({ search: target.value })}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Search results */}
        <ReactCatalogue dslAddress={DSL_PROXY} index={DSL_INDEX}>
          {(useCatalog) => {
            const { error, loading, data } = useCatalog({
              _source: {
                includes: ['metadata_json.subjects.*'],
              },
              query: {
                match: {
                  'metadata_json.subjects.subject': {
                    query: 'landcover',
                    fuzziness: 'AUTO',
                  },
                },
              },
            })

            return error ? (
              <div style={{ marginBottom: 20 }}>
                <Alert severity="error">{error.message}</Alert>
              </div>
            ) : loading ? (
              'Loading...'
            ) : (
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    {loading ? (
                      <Typography>Loading...</Typography>
                    ) : (
                      <div style={{ width: '100%' }}>
                        <div>{elkResults.length} items found</div>
                        <VirtualList
                          items={elkResults}
                          height={height}
                          width={width}
                          Template={({ layerId, port, pathname, layers, resourceDescription }) => {
                            return (
                              <Card style={{ marginRight: 5 }} variant="outlined" square={true}>
                                <CardHeader
                                  titleTypographyProps={{
                                    variant: 'overline',
                                  }}
                                  subheaderTypographyProps={{
                                    variant: 'caption',
                                  }}
                                  title={resourceDescription}
                                  subheader={layerId}
                                  action={
                                    <Checkbox
                                      style={{ float: 'right' }}
                                      size="small"
                                      edge="start"
                                      checked={Boolean(proxy.getLayerById(layerId))}
                                      onChange={({ target }) => {
                                        if (target.checked) {
                                          let serverAddress = `${SPATIALDATA_PROXY}/${port}${pathname}`
                                          proxy.addLayer(
                                            createLayer({
                                              LegendMenu: () => (
                                                <LegendMenu
                                                  title={layerId}
                                                  uri={`${serverAddress}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&TRANSPARENT=true&LAYER=${layers}&LEGEND_OPTIONS=forceLabels:on`}
                                                />
                                              ),
                                              layerType: LayerTypes.TileWMS,
                                              id: layerId,
                                              title: layerId,
                                              uri: serverAddress,
                                              LAYERS: layers,
                                            })
                                          )
                                        } else {
                                          proxy.removeLayerById(layerId)
                                        }
                                      }}
                                    />
                                  }
                                />
                              </Card>
                            )
                          }}
                          loadMoreItems={async () => {
                            alert('TODO - this is being migrated to a Lucene-based search')
                          }}
                        />
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            )
          }}
        </ReactCatalogue>
      </Grid>
    )}
  </Form>
)
