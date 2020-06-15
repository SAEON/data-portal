import React from 'react'
import { render } from 'react-dom'
import { ReactCatalogue } from '../../src/catalogue-search-react'

describe('COMPONENT: ElasticCatalogueReact', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div')
    render(
      <ReactCatalogue
        source={{
          includes: ['metadata_json.subjects.*'],
        }}
        matchClauses={[
          {
            query: 'landcover',
            fields: ['metadata_json.subjects.subject'],
            fuzziness: 'AUTO',
          },
        ]}
        dslAddress="testing"
        index={'testing'}
      >
        {useCatalog => {
          const { loading, error, data } = useCatalog()
          return loading ? (
            <div>Loading</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <div>{JSON.stringify(data)}</div>
          )
        }}
      </ReactCatalogue>,
      div
    )
  })
})
