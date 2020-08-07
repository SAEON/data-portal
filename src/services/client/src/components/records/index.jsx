import React, { useState, useEffect, useContext, useRef } from 'react'
import { useQuery, gql } from '@apollo/client'
import Header from './header'
import Sidebar from './sidebar'
import Items from './items'
import MiniSearch from 'minisearch'
import { UriStateContext } from '../../modules/provider-uri-state'
import { Typography, LinearProgress, Grid } from '@material-ui/core'

const DEFAULT_CURSORS = {
  start: undefined,
  end: undefined,
  currentPage: 0,
}

export default ({ hideSidebar = false, disableSidebar = false }) => {
  const ref = useRef()
  const { uriState } = useContext(UriStateContext)
  const [pageSize, setPageSize] = useState(20)
  const [textSearch, setTextSearch] = useState('')
  const [cursors, setCursors] = useState(DEFAULT_CURSORS)

  const terms = (uriState.terms || '')
    .split(',')
    .map(item => decodeURIComponent(item))
    .filter(_ => _)

  useEffect(() => {
    if (ref.current && terms.length !== ref.current.length) {
      setCursors(DEFAULT_CURSORS)
    }

    ref.current = terms
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

  console.log('rendering records', Boolean(error), Boolean(loading), Boolean(data))

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

  return error ? (
    <Typography>Error</Typography>
  ) : (
    <Header
      hideSidebar={hideSidebar}
      disableSidebar={disableSidebar}
      cursors={cursors}
      setCursors={setCursors}
      setPageSize={setPageSize}
      pageSize={pageSize}
      loading={loading}
      catalogue={data?.catalogue}
      setTextSearch={setTextSearch}
      textSearch={textSearch}
      Sidebar={Sidebar}
      ResultList={() =>
        loading ? (
          <Grid item xs={12} style={{ position: 'relative' }}>
            <LinearProgress style={{ position: 'absolute', left: 0, right: 0 }} />
          </Grid>
        ) : (
          <Items
            loading={loading}
            results={
              miniSearchResults
                ? miniSearchResults.map(([id, score]) =>
                    Object.assign(
                      { ...results.find(({ target }) => id === target?._id) },
                      { score }
                    )
                  )
                : results
            }
          />
        )
      }
    />
  )
}