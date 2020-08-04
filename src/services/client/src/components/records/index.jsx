import React, { useState, useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import Layout from './layout'
import Sidebar from './sidebar'
import Items from './items'
import MiniSearch from 'minisearch'
import { UriStateContext } from '../../modules/provider-uri-state'

export default ({ hideSidebar = false, disableSidebar = false, headerColor = 'inherit' }) => {
  const { getUriState } = useContext(UriStateContext)
  const { terms = [] } = getUriState()
  const [pageSize, setPageSize] = useState(20)
  const [textSearch, setTextSearch] = useState('')
  const [cursors, setCursors] = useState({
    start: undefined,
    end: undefined,
    currentPage: 0,
  })

  const { error, loading, data } = useQuery(
    gql`
      query catalogue($subjects: [String!], $size: Int, $before: ID, $after: ID) {
        catalogue {
          records(subjects: $subjects, size: $size, before: $before, after: $after) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            totalCount
            nodes {
              target
            }
          }
        }
      }
    `,
    {
      variables: {
        subjects: terms || [],
        size: pageSize,
        after: cursors.end,
        before: cursors.start,
      },
    }
  )

  let miniSearchResults
  if (data && textSearch) {
    const miniSearch = new MiniSearch({
      fields: [
        'target._source.metadata_json.titles.0.title',
        'target._source.metadata_json.descriptions.0.description',
        'target._source.metadata_json.creators.0.name',
        'target._source.metadata_json.subtitle',
        'target._source.metadata_json.contributors.0.name',
      ],
      storeFields: ['target._id'],
      extractField: (document, fieldName) => {
        return fieldName.split('.').reduce((doc, key) => doc && doc[key], document)
      },
      searchOptions: {
        fuzzy: 0.5,
      },
    })

    miniSearch.addAll(
      data?.catalogue.records.nodes.map(node =>
        Object.assign({ ...node }, { id: node?.target?._id })
      )
    )

    miniSearchResults = miniSearch.search(textSearch).map(({ id, score }) => [id, score])
  }

  // TODO - I think that this is the OLD value of cursors.start prior to state update. Works but should reference the new value
  const results = data?.cursors?.start
    ? data?.catalogue.records.nodes.slice(0).reverse()
    : data?.catalogue.records.nodes || []

  return (
    <Layout
      headerColor={headerColor}
      hideSidebar={hideSidebar}
      disableSidebar={disableSidebar}
      cursors={cursors}
      setCursors={setCursors}
      setPageSize={setPageSize}
      pageSize={pageSize}
      error={error}
      loading={loading}
      catalogue={data?.catalogue}
      setTextSearch={setTextSearch}
      textSearch={textSearch}
      Sidebar={() => <Sidebar />}
      ResultList={() => (
        <Items
          error={error}
          loading={loading}
          results={
            miniSearchResults
              ? miniSearchResults.map(([id, score]) =>
                  Object.assign({ ...results.find(({ target }) => id === target?._id) }, { score })
                )
              : results
          }
        />
      )}
    />
  )
}
