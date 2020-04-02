import React, { useState } from 'react'
import {
  TextField,
  Grid,
  Typography,
  Card,
  CardHeader,
  Checkbox,
  InputAdornment,
  Chip,
} from '@material-ui/core'
import { Form } from '../../components'
import { Search as SearchIcon } from '@material-ui/icons'
import npmUrl from 'url'
import { VirtualList, useHttpDataQuery } from '../../components'
import { Alert, Autocomplete } from '@material-ui/lab'
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

export default ({ height, width, proxy }) => {
  const [selectedTerms, setSelectedTerms] = useState([])
  const { error, loading, data } = useHttpDataQuery({
    uri: DSL_PROXY,
    method: 'POST',
    body: {
      aggs: {
        subjects: {
          terms: { field: 'metadata_json.subjects.subject.raw', size: 1000 },
        },
      },
    },
  })

  return loading ? (
    <Typography>Loading ...</Typography>
  ) : error ? (
    <Typography>Error TODO</Typography>
  ) : (
    <Form textSearch="">
      {({ updateForm, textSearch }) => (
        <Grid container spacing={3}>
          {/* Search controls */}
          <Grid item xs={12}>
            {/* Free search */}
            <TextField
              size="small"
              id="catalog-search-free-text"
              placeholder="e.g. atmospheric, water, etc."
              label="Text search"
              autoComplete="off"
              value={textSearch}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={({ target }) => updateForm({ textSearch: target.value })}
            />

            {/* Tagged, constrained terms */}
            <Autocomplete
              getOptionSelected={(a, b) => a.key === b.key}
              onChange={(e, value) => setSelectedTerms(value.map((v) => v.key))}
              multiple
              autoHighlight
              size="small"
              style={{ width: '100%', marginTop: 10 }}
              id="catalog-search-tagged-search"
              options={data.aggregations.subjects.buckets.map(({ key, doc_count }) => ({
                key: key.trim(),
                doc_count,
              }))}
              getOptionLabel={(option) => option.key}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={index}
                    size="small"
                    color="secondary"
                    label={option.key}
                    {...getTagProps({ index })}
                    disabled={false}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Term search"
                  variant="outlined"
                  placeholder="start typing..."
                />
              )}
            />
          </Grid>

          {/* Search results */}
          <ReactCatalogue dslAddress={DSL_PROXY} index={DSL_INDEX}>
            {(useCatalog) => {
              const { error, loading, data } = useCatalog({
                _source: {
                  includes: ['metadata_json.*'],
                },
                query: {
                  match: {
                    'metadata_json.subjects.subject': {
                      query: `${textSearch}, ${selectedTerms.join(',')}`,
                      fuzziness: 'AUTO',
                    },
                  },
                },
              })

              return (
                <Grid item xs={12}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      {error ? (
                        <Alert severity="error">{error.message}</Alert>
                      ) : loading ? (
                        <Typography>Loading...</Typography>
                      ) : (
                        <div style={{ width: '100%' }}>
                          <div>{data.hits.total} items found</div>
                          <VirtualList
                            items={data.hits.hits
                              .map(({ _source }) => {
                                const { metadata_json } = _source
                                return (
                                  metadata_json.linkedResources
                                    ?.filter((r) => r.linkedResourceType === 'Query')
                                    ?.map(({ resourceURL, resourceDescription }) => {
                                      const uri = npmUrl.parse(resourceURL, true)
                                      const { protocol, pathname, query, port, hostname } = uri
                                      const { layers } = query
                                      const layerId = `${resourceDescription} - ${layers}`
                                      return {
                                        layerId,
                                        resourceURL,
                                        resourceDescription,
                                        protocol,
                                        port,
                                        hostname,
                                        pathname,
                                        layers,
                                      }
                                    }) || []
                                )
                              })
                              .flat()}
                            height={height}
                            width={width}
                            Template={({
                              hostname,
                              layerId,
                              port,
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
                                            let serverAddress = `${SPATIALDATA_PROXY}/${hostname}/${port}${pathname}`
                                            console.log(hostname)
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
}
