import React, { useState } from 'react'
import { SpeedDial } from '../../components'
import { TextField, Grid } from '@material-ui/core'
import { DragMenu, Form } from '../../components'
import { Layers as LayersIcon, Search as SearchIcon } from '@material-ui/icons'
import { debounceGlobal } from '../../../../fns-lib'
import npmUrl from 'url'
import { VirtualList } from '../../components'

const searcher = ({ url }) => fetch(url).then(res => res.json())
const ATLAS_API_ADDRESS = process.env.ATLAS_API_ADDRESS || 'http://localhost:3000'

export default ({ proxy }) => {
  const [dialOpen, setDialOpen] = useState(false)
  const [saeonSearch, setSaeonSearch] = useState(false)

  return (
    <SpeedDial
      style={{ position: 'absolute', left: 20, top: 57 }}
      onOpen={() => setDialOpen(true)}
      onClose={() => setDialOpen(false)}
      open={dialOpen}
      icon={<SearchIcon />}
    >
      {[
        {
          icon: <LayersIcon />,
          tooltip: 'Search SAEON',
          toggle: () => setSaeonSearch(!saeonSearch),
          Component: (
            <DragMenu
              title="Search SAEON"
              active={saeonSearch}
              close={() => setSaeonSearch(false)}
              proxy={proxy}
            >
              <Form loading={false} search="" searchResults={[{ result_length: 0 }]}>
                {({ updateForm, loading, search, searchResults }) => (
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
                          <VirtualList
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
            </DragMenu>
          )
        }
      ]}
    </SpeedDial>
  )
}
