import React from 'react'
import { newLayer } from '../../layers'
import { Form, debounceGlobal } from '../../lib'
import npmUrl from 'url'

const searcher = ({ url }) => fetch(url).then((res) => res.json())

export default ({ proxy }) => (
  <Form search="" searchResults={[]}>
    {({ updateForm, ...fields }) => (
      <div>
        <input
          type="text"
          value={fields.search}
          onChange={(e) => {
            const search = e.target.value
            updateForm(
              { search, loading: true },
              debounceGlobal(
                async () =>
                  updateForm({
                    searchResults: [
                      await searcher({
                        url: `http://localhost:3000/saeon-metadata/search?index=saeon-odp-4-2&fields=metadata_json.linkedResources,record_id,metadata_json.titles,metadata_json.subjects&metadata_json.subjects.subject=${search}&metadata_json.linkedResources.resourceURL=*WMS`,
                      }),
                    ],
                    loading: false,
                  }),
                1000
              )
            )
          }}
        />
        <div>
          {fields.loading ? (
            'Loading ...'
          ) : (
            <div style={{ maxHeight: '300px', overflow: 'auto' }}>
              <div>{fields.searchResults[0]?.result_length || 0} items found</div>
              {fields.searchResults[0]?.results
                ? fields.searchResults
                    .reduce(
                      (result, current) => ({
                        success: result.success && current.success,
                        results: result.results.concat(current.results),
                        result_length: result.result_length + current.result_length,
                      }),
                      {
                        success: fields.searchResults[0].success,
                        result_length: 0,
                        results: [],
                      }
                    )
                    .results.map(({ metadata_json }) =>
                      metadata_json.linkedResources
                        .filter((r) => r.linkedResourceType === 'Query')
                        .map(({ resourceURL, resourceDescription }, i) => {
                          const uri = npmUrl.parse(resourceURL, true)
                          const { protocol, host, pathname, query } = uri
                          const { layers } = query
                          const layerId = `${resourceDescription} - ${layers}`
                          return (
                            <div key={i} style={{ margin: '8px 0', backgroundColor: '#8080807a' }}>
                              <input
                                style={{ margin: '0 8px' }}
                                type="checkbox"
                                checked={proxy.getLayerById(layerId) || false}
                                onChange={({ target }) => {
                                  if (target.checked) {
                                    const serverAddress = `${protocol}//${host}${pathname}`
                                    proxy.addLayer(
                                      newLayer({
                                        id: layerId,
                                        title: layerId,
                                        url: serverAddress,
                                        name: layers,
                                      })
                                    )
                                  } else {
                                    proxy.removeLayerById(layerId)
                                  }
                                }}
                              />
                              <p style={{ display: 'inline-block' }}>{layerId}</p>
                            </div>
                          )
                        })
                    )
                : ''}
              <div>
                {fields.searchResults[0]?.result_length >= 100 ? (
                  <button
                    onClick={async () =>
                      updateForm({
                        searchResults: [
                          ...fields.searchResults,
                          await searcher({
                            url: `http://localhost:3000/saeon-metadata/search?index=saeon-odp-4-2&fields=metadata_json.linkedResources,record_id,metadata_json.titles,metadata_json.subjects&metadata_json.subjects.subject=${
                              fields.search
                            }&metadata_json.linkedResources.resourceURL=*WMS&start=${
                              fields.searchResults.reduce((c, curr) => c + curr.result_length, 0) +
                              1
                            }`,
                          }),
                        ],
                      })
                    }
                  >
                    Load more results
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </Form>
)
