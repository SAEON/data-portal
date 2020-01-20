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
                  `http://localhost:3000/saeon-metadata/search?index=saeon-odp-4-2&fields=metadata_json,record_id,organization&metadata_json.subjects.subject=${search}"`
                )
                  .then(res => res.text())
                  .then(txt => JSON.parse(txt))

                updateForm({ result, loading: false })
              }, 1000)
            )
          }}
        />
        <div>
          {fields.loading ? 'Loading ...' : (fields.result.result_length || 0) + ' items found'}
        </div>
      </div>
    )}
  </Form>
)
