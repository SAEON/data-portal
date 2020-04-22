import React from 'react'
import { render } from 'react-dom'
import { ReactCatalogue } from '../../src'

describe('COMPONENT: ElasticCatalogueReact', () => {
  it('Renders without crashing', () => {
    const div = document.createElement('div')
    render(
      <ReactCatalogue dslAddress="testing" index={'testing'}>
        {(useCatalog) => {
          const { loading, error, data } = useCatalog({
            _source: {
              includes: ['metadata_json.subjects.*'],
            },
            query: {
              match: {
                'metadata_json.subjects.subject': {
                  query: 'landcover',
                  fuzziness: 'AUTO',
                },
              },
            },
          })
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
