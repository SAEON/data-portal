import React, { useState, useEffect, useContext, useRef } from 'react'
import { useQuery, gql } from '@apollo/client'
import Header from './header'
import Sidebar from './sidebar'
import Items from './items'
import { UriStateContext } from '../../modules/provider-uri-state'
import { Typography, Grid, Collapse } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import { Loading } from '../../components'

const DEFAULT_CURSORS = {
  start: undefined,
  end: undefined,
  currentPage: 0,
}

export default ({ hideSidebar = false, disableSidebar = false }) => {
  const [showSidebar, setShowSidebar] = useState(disableSidebar === true ? false : !hideSidebar)
  const ref = useRef()
  const { getUriState } = useContext(UriStateContext)
  const [pageSize, setPageSize] = useState(20)
  const [cursors, setCursors] = useState(DEFAULT_CURSORS)
  const { terms = undefined } = getUriState({ splitString: true })
  const { extent = undefined, text = undefined } = getUriState({ splitString: false })

  useEffect(() => {
    if (ref.current && (terms?.length !== ref.current.terms?.length || text !== ref.current.text)) {
      setCursors(DEFAULT_CURSORS)
    }
    ref.current = { terms, text }
  }, [terms, extent, text])

  const { error, loading, data } = useQuery(
    gql`
      query(
        $extent: WKT_4326
        $match: String
        $terms: [String!]
        $size: Int
        $before: ES_Cursor
        $after: ES_Cursor
        $fields: [String!]
      ) {
        catalogue {
          summary(
            fields: $fields
            filterByText: $match
            filterByExtent: $extent
            filterByTerms: $terms
          )
          records(
            extent: $extent
            match: $match
            terms: $terms
            size: $size
            before: $before
            after: $after
          ) {
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
        fields: [
          'identifier.identifierType.raw',
          'publicationYear.raw',
          'publisher.raw',
          'subjects.subject.raw',
          'creators.name.raw',
        ],
        extent: extent || undefined,
        terms: terms || [],
        match: text || undefined,
        size: pageSize,
        after: cursors.end,
        before: cursors.start,
      },
    }
  )

  /**
   * cursors.start is only set when navigating BACK,
   * data items must be reversed when paged BACK
   */
  const results = cursors.start
    ? data?.catalogue.records.nodes.slice(0).reverse()
    : data?.catalogue.records.nodes

  return error ? (
    <Typography>{JSON.stringify(error)}</Typography>
  ) : (
    <Header
      disableSidebar={disableSidebar}
      showSidebar={showSidebar}
      setShowSidebar={setShowSidebar}
      cursors={cursors}
      setCursors={setCursors}
      setPageSize={setPageSize}
      pageSize={pageSize}
      loading={loading}
      catalogue={data?.catalogue}
    >
      <Grid style={{ height: '100%' }} container direction="row">
        {loading ? (
          <Grid item xs={12} style={{ position: 'relative' }}>
            <Loading />
          </Grid>
        ) : (
          <>
            {/**
             * TODO: Add toggle sidebar collapse animation
             *
             * Although @material-ui/core adds support for
             * horizontal collapse, the grid item has to be
             * a direct descendant of grid container
             *
             * So i'm not sure how to animate changs to the
             * flex layout at this point
             **/}
            {disableSidebar ? null : isMobile ? (
              <Collapse orientation={'vertical'} in={showSidebar}>
                <Grid item xs={12}>
                  <Sidebar catalogue={data?.catalogue} />
                </Grid>
              </Collapse>
            ) : showSidebar ? (
              <Grid item md={4}>
                <Sidebar catalogue={data?.catalogue} />
              </Grid>
            ) : null}
            <Grid item xs style={{ flexGrow: 1 }}>
              <Items results={results} />
            </Grid>
          </>
        )}
      </Grid>
    </Header>
  )
}
