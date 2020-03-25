import React from 'react'
import { TextField, Grid, Card, CardHeader, Checkbox } from '@material-ui/core'
import { Form } from '../../components'
import { Search as SearchIcon } from '@material-ui/icons'
import { debounceGlobal } from '../../../../fns-lib'
import npmUrl from 'url'
import { VirtualList } from '../../components'
import { Alert } from '@material-ui/lab'
import { createLayer, LayerTypes } from '../../lib/ol'
import LegendMenu from './_legend-menu'
import CatalogueSearch from '@saeon/catalogue-search'
CatalogueSearch()

const ATLAS_API_ADDRESS = process.env.ATLAS_API_ADDRESS || 'http://localhost:4000'

const searcher = ({ url }) =>
  fetch(url)
    .then((res) => res.json())
    .catch(() => ({ error: new Error('SAEON catalogue is not responding') }))

export default ({ proxy, height, width }) => (
  <Form loading={false} search="" error={false} items={[]}>
    {({ updateForm, loading, error, search, items }) => (
      <>
        {error ? (
          <div style={{ marginBottom: 20 }}>
            <Alert severity="error">{error.message}</Alert>
          </div>
        ) : (
          ''
        )}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <SearchIcon />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete="off"
                  value={search}
                  onChange={(e) => {
                    const search = e.target.value
                    updateForm(
                      { search, loading: true },
                      debounceGlobal(async () => {
                        const searchResponse = await searcher({
                          url: `${ATLAS_API_ADDRESS}/saeon-metadata/search?index=saeon-odp-4-2&fields=metadata_json.linkedResources,record_id,metadata_json.titles,metadata_json.subjects&metadata_json.subjects.subject=${search}&metadata_json.linkedResources.resourceURL=*WMS`,
                        })
                        if (searchResponse.error) {
                          updateForm({ error: searchResponse.error })
                        } else {
                          updateForm({
                            items: searchResponse.results
                              ? searchResponse.results
                                  .map(({ metadata_json }) =>
                                    metadata_json.linkedResources
                                      .filter((r) => r.linkedResourceType === 'Query')
                                      .map(({ resourceURL, resourceDescription }) => {
                                        const uri = npmUrl.parse(resourceURL, true)
                                        const { protocol, host, pathname, query } = uri
                                        const { layers } = query
                                        const layerId = `${resourceDescription} - ${layers}`
                                        return {
                                          layerId,
                                          resourceURL,
                                          resourceDescription,
                                          protocol,
                                          host,
                                          pathname,
                                          layers,
                                        }
                                      })
                                  )
                                  .flat()
                              : [],
                            loading: false,
                            error: false,
                          })
                        }
                      }, 1000)
                    )
                  }}
                  id="saeon-ckan-search"
                  label="Search"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {loading ? (
              'Loading ...'
            ) : (
              <div style={{ width: '100%' }}>
                <div>{items.length} items found</div>
                <VirtualList
                  height={height}
                  width={width}
                  Template={({
                    layerId,
                    protocol,
                    host,
                    pathname,
                    layers,
                    resourceDescription,
                  }) => {
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
                                  let serverAddress = `${protocol}//${host}${pathname}`
                                  if (process.env.NODE_ENV === 'production')
                                    serverAddress = serverAddress.replace(
                                      'http://app01.saeon.ac.za',
                                      'https://spatialdata.saeon.ac.za'
                                    )

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
                  items={items}
                />
              </div>
            )}
          </Grid>
        </Grid>
      </>
    )}
  </Form>
)
