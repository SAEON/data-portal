import React from 'react'
import Draggable from 'react-draggable'
import Card from '@material-ui/core/Card'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import SearchIcon from '@material-ui/icons/Search'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Form from '../../components/form'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { FixedSizeList } from 'react-window'
import { debounceGlobal } from '../../../../_lib'
import npmUrl from 'url'

import { Tile as TileLayer } from 'ol/layer.js'
import { TileWMS } from 'ol/source'

export const newLayer = ({ id, title, url, name }) => {
  return new TileLayer({
    id,
    title: title || id,
    visible: true,
    source: new TileWMS({
      url,
      params: {
        LAYERS: name,
        TILED: true,
        FORMAT: 'image/png'
      },
      serverType: 'geoserver',
      transition: 500
    }),
    opacity: 0.7
  })
}

const searcher = ({ url }) => fetch(url).then(res => res.json())

export default ({ proxy, active, close }) => (
  <Draggable
    axis="both"
    handle=".draggable-handle"
    defaultPosition={{ x: 400, y: 200 }}
    position={null}
    grid={[1, 1]}
    scale={1}
  >
    <div
      style={{
        opacity: 0.8,
        zIndex: 50,
        position: 'absolute',
        display: active ? 'block' : 'none'
      }}
    >
      <Card variant="elevation">
        <CardContent style={{ padding: 0 }}>
          <div className="draggable-handle">
            <AppBar position="relative" variant="outlined">
              <Toolbar disableGutters variant="dense">
                <DragIndicatorIcon />
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
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
        </CardContent>
        <CardContent>
          <CardActions>
            <Form loading={false} search="" searchResults={{ result_length: 0 }}>
              {({ updateForm, loading, search, searchResults }) => (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="flex-end">
                      <Grid item>
                        <SearchIcon />
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
                                        url: `http://localhost:3000/saeon-metadata/search?index=saeon-odp-4-2&fields=metadata_json.linkedResources,record_id,metadata_json.titles,metadata_json.subjects&metadata_json.subjects.subject=${search}&metadata_json.linkedResources.resourceURL=*WMS`
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
                      <div>
                        <div>{searchResults[0]?.result_length || 0} items found</div>
                        {(searchResults => (
                          <FixedSizeList
                            height={350}
                            itemSize={30}
                            itemCount={searchResults.result_length}
                          >
                            {({ index, style }) => {
                              const item = searchResults.results[index]
                              const { resourceURL, resourceDescription } = item
                              const uri = npmUrl.parse(resourceURL, true)
                              const { protocol, host, pathname, query } = uri
                              const { layers } = query
                              const layerId = `${resourceDescription} - ${layers}`

                              return (
                                <ListItem button style={style} key={index}>
                                  <ListItemText primary={layerId} />
                                  <ListItemSecondaryAction>
                                    <Checkbox
                                      edge="end"
                                      checked={proxy.getLayerById(layerId) || false}
                                      onChange={({ target }) => {
                                        if (target.checked) {
                                          const serverAddress = `${protocol}//${host}${pathname}`
                                          proxy.addLayer(
                                            newLayer({
                                              id: layerId,
                                              title: layerId,
                                              url: serverAddress,
                                              name: layers
                                            })
                                          )
                                        } else {
                                          proxy.removeLayerById(layerId)
                                        }
                                      }}
                                    />
                                  </ListItemSecondaryAction>
                                </ListItem>
                              )
                            }}
                          </FixedSizeList>
                        ))(
                          searchResults[0]?.results
                            ? searchResults.reduce(
                                (result, current) => ({
                                  success: result.success && current.success,
                                  results: result.results
                                    .concat(
                                      current.results.map(({ metadata_json }) =>
                                        metadata_json.linkedResources.filter(
                                          r => r.linkedResourceType === 'Query'
                                        )
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
                        )}
                      </div>
                    )}
                  </Grid>
                  <Grid item>
                    <div>
                      {/* TODO */}
                      {searchResults.result_length >= 100 ? (
                        <button
                          onClick={async () =>
                            updateForm({
                              searchResults
                            })
                          }
                        >
                          Load more results
                        </button>
                      ) : (
                        ''
                      )}
                    </div>
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
