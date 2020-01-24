import React from 'react'
import { newLayer } from '../../layers'
import { Form, debounceGlobal } from '../../lib'
import npmUrl from 'url'

const searcher = ({ url }) => fetch(url).then(res => res.json())

export default ({ proxy }) => (
  <Form search="" searchResults={[]}>
    {({ updateForm, ...fields }) => (
      <div>
        <input
          type="text"
          value={fields.search}
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
        />
        <div>
          {fields.loading ? (
            'Loading ...'
          ) : (
            <div style={{ maxHeight: '300px', overflow: 'auto' }}>
              <div>{fields.searchResults[0]?.result_length || 0} items found</div>
              {fields.searchResults[0]?.results
                ? fields.searchResults[0].results.map(({ metadata_json }) =>
                    metadata_json.linkedResources
                      .filter(r => r.linkedResourceType === 'Query')
                      .map(({ resourceURL, resourceDescription }, i) => (
                        <div key={i} style={{ margin: '8px 0', backgroundColor: '#8080807a' }}>
                          <input
                            style={{ margin: '0 8px' }}
                            type="checkbox"
                            checked={proxy.getLayerById(resourceDescription) || false}
                            onChange={({ target }) => {
                              if (target.checked) {
                                const uri = npmUrl.parse(resourceURL, true)
                                const { protocol, host, pathname, query } = uri
                                const { layers } = query
                                const serverAddress = `${protocol}//${host}${pathname}`
                                proxy.addLayer(
                                  newLayer({
                                    id: resourceDescription,
                                    title: resourceDescription,
                                    url: serverAddress,
                                    name: layers
                                  })
                                )
                              } else {
                                proxy.removeLayerById(resourceDescription)
                              }
                            }}
                          />
                          <p style={{ display: 'inline-block' }}>{resourceDescription}</p>
                        </div>
                      ))
                  )
                : ''}
              <div>
                {fields.searchResults[0] && fields.searchResults[0].result_length >= 100 ? (
                  <button onClick={() => alert('hi')}>Load more results</button>
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
