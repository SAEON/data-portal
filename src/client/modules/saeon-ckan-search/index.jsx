import React from 'react'
import { Form, debounce } from '../../lib'
import gql from 'graphql-tag'

export default ({ httpClient }) => (
  <Form
    onComponentDidUpdate={debounce(async () => {
      // Update CKAN search results
      // const { search } = fields
      console.log('Updating search results')

      const query = gql`
        query luke {
          search
            @rest(
              type: "Get"
              path: "/saeon-metadata/search?index=saeon-odp-4-2&fields=metadata_json,record_id,organization&metadata_json.subjects.subject=test"
            ) {
            success
            result_length
            metadata_json
          }
        }
      `

      await httpClient.query({ query }).then(response => {
        console.log(response)
      })
    }, 1000)}
    search="test"
  >
    {({ updateForm, ...fields }) => (
      <div>
        <input
          type="text"
          value={fields.search}
          onChange={e => updateForm({ search: e.target.value })}
        />
      </div>
    )}
  </Form>
)
