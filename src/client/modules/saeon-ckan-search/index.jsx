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
              debounceGlobal(
                async () =>
                  updateForm({
                    result: await fetch(
                      `http://localhost:3000/saeon-metadata/search?index=saeon-odp-4-2&fields=metadata_json.linkedResources,record_id,metadata_json.titles,metadata_json.subjects&metadata_json.subjects.subject=${search}&metadata_json.linkedResources.resourceURL=*WMS`
                    ).then(res => res.json()),
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
            <div>
              <div>{fields.result.result_length || 0} items found</div>
              {fields.result.results
                ? fields.result.results.map(({ metadata_json }) =>
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
