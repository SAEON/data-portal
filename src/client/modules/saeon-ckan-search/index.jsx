import React from 'react'
import { Form, debounceGlobal } from '../../lib'

export default () => (
  <Form search="test" result={{}}>
    {({ updateForm, ...fields }) => (
      <div>
        <input
          type="text"
          value={fields.search}
          onChange={e => {
            const search = e.target.value
            updateForm(
              { search, loading: true },
              debounceGlobal(async () => {
                // Update CKAN search results
                console.log('Updated search term', search)

                const result = await fetch(
                  `http://localhost:3000/saeon-metadata/search?index=saeon-odp-4-2&fields=metadata_json,record_id,organization&metadata_json.subjects.subject=${search},WMS"`
                ).then(res => res.json())

                updateForm({ result, loading: false })
              }, 1000)
            )
          }}
        />
        <div>
          {fields.loading ? (
            'Loading ...'
          ) : (
            <div>
              <div>{fields.result.result_length || 0} items found</div>
              {fields.result.results
                ? fields.result.results
                    .filter(({ metadata_json }) =>
                      metadata_json.subjects
                        .reduce((acc, s) => [...new Set([...acc, s.subject.trim()])], [])
                        .includes('WMS')
                        ? true
                        : false
                    )
                    .map(({ metadata_json }) =>
                      metadata_json.linkedResources
                        .filter(r => r.linkedResourceType === 'Query')
                        .map((r, i) => (
                          <div key={i}>
                            <p style={{ display: 'inline-block' }}>{r.resourceDescription}</p>

                            <input
                              style={{ marginLeft: '8px' }}
                              type="checkbox"
                              checked={false}
                              onChange={() => alert('hi')}
                            />
                          </div>
                        ))
                    )
                : ''}
            </div>
          )}
        </div>
      </div>
    )}
  </Form>
)
