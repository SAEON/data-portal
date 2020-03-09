import React from 'react'
import Draggable from 'react-draggable'
import {
  Card,
  CardActions,
  CardContent,
  TextField,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core'
import { Search, DragIndicator, Close } from '@material-ui/icons'
import Form from '../../components/form'
import { debounceGlobal } from '../../../../fns-lib'
import npmUrl from 'url'
import WindowedList from './windowed-list'

const searcher = ({ url }) => fetch(url).then(res => res.json())

const ATLAS_API_ADDRESS = process.env.ATLAS_API_ADDRESS || 'http://localhost:3000'

export default ({ proxy, active, close }) => (
  <Draggable
    axis="both"
    handle=".draggable-handle"
    defaultPosition={{ x: 400, y: 50 }}
    position={null}
    grid={[1, 1]}
    scale={1}
  >
    <div
      style={{
        opacity: 0.8,
        zIndex: 50,
        position: 'absolute',
        display: active ? 'block' : 'none',
        maxWidth: '600px'
      }}
    >
      <Card variant="elevation">
        <CardContent style={{ padding: 0 }}>
          <div className="draggable-handle">
            <AppBar position="relative" variant="outlined">
              <Toolbar disableGutters variant="dense">
                <DragIndicator />
                <Typography style={{ padding: '0 50px 0 10px' }} display="block" variant="overline">
                  CKAN catalogue search
                </Typography>
                <IconButton
                  onClick={close}
                  edge="start"
                  color="inherit"
                  style={{ order: 2, marginLeft: 'auto' }}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
        </CardContent>
        <CardContent>
          <CardActions>
            <Form loading={false} search="" searchResults={[{ result_length: 0 }]}>
              {({ updateForm, loading, search, searchResults }) => (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <Search />
                      </Grid>
                      <Grid item>
                        <TextField
                          value={search}
                          onChange={e => {
                            const search = e.target.value
                            updateForm(
                              { search, loading: true },
                              debounceGlobal(
                                async () =>
                                  updateForm({
                                    searchResults: [
                                      await searcher({
                                        url: `${ATLAS_API_ADDRESS}/saeon-metadata/search?index=saeon-odp-4-2&fields=metadata_json.linkedResources,record_id,metadata_json.titles,metadata_json.subjects&metadata_json.subjects.subject=${search}&metadata_json.linkedResources.resourceURL=*WMS`
                                      })
                                    ],
                                    loading: false
                                  }),
                                1000
                              )
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
                        <div>
                          {searchResults?.reduce((c, curr) => c + curr.result_length, 0)} items
                          found
                        </div>
                        <WindowedList
                          loadMoreItems={async () =>
                            updateForm({
                              searchResults: [
                                ...searchResults,
                                await searcher({
                                  url: `${ATLAS_API_ADDRESS}/saeon-metadata/search?index=saeon-odp-4-2&fields=metadata_json.linkedResources,record_id,metadata_json.titles,metadata_json.subjects&metadata_json.subjects.subject=${search}&metadata_json.linkedResources.resourceURL=*WMS&start=${searchResults.reduce(
                                    (c, curr) => c + curr.result_length,
                                    0
                                  ) + 1}`
                                })
                              ]
                            })
                          }
                          proxy={proxy}
                          content={
                            searchResults[0]?.results
                              ? searchResults.reduce(
                                  (result, current) => ({
                                    success: result.success && current.success,
                                    results: result.results
                                      .concat(
                                        current.results.map(({ metadata_json }) =>
                                          metadata_json.linkedResources
                                            .filter(r => r.linkedResourceType === 'Query')
                                            .map(({ resourceURL, resourceDescription }) => {
                                              const uri = npmUrl.parse(resourceURL, true)
                                              const { protocol, host, pathname, query } = uri
                                              const { layers } = query
                                              const layerId = `${resourceDescription} - ${layers}`
                                              return Object.assign(
                                                {
                                                  selected: proxy.getLayerById(layerId)
                                                    ? true
                                                    : false
                                                },
                                                {
                                                  layerId,
                                                  resourceURL,
                                                  resourceDescription,
                                                  protocol,
                                                  host,
                                                  pathname,
                                                  layers
                                                }
                                              )
                                            })
                                        )
                                      )
                                      .flat(),
                                    result_length: result.result_length + current.result_length
                                  }),
                                  {
                                    success: searchResults[0].success,
                                    result_length: 0,
                                    results: []
                                  }
                                )
                              : { result_length: 0 }
                          }
                        />
                      </div>
                    )}
                  </Grid>
                </Grid>
              )}
            </Form>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  </Draggable>
)
