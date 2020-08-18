import React, { useState, useEffect, useContext, useRef } from 'react'
import { useQuery, gql } from '@apollo/client'
import Header from './header'
import Sidebar from './sidebar'
import Items from './items'
import { UriStateContext } from '../../modules/provider-uri-state'
import { Typography, LinearProgress, Grid, Collapse } from '@material-ui/core'
import { isMobile } from 'react-device-detect'

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
      query catalogue(
        $extent: WKT_4326
        $match: String
        $terms: [String!]
        $size: Int
        $before: ES_Cursor
        $after: ES_Cursor
      ) {
        catalogue {
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
      {/**
       * TODO: Add toggle sidebar collapse animation
       *
       * Although @material-ui/core adds support for
       * horizontal collapse, the grid item has to be
       * a direct descendant of grid container
       *
       * So i'm not sure how to animate changs to the
       * flex layout
       **/}
      <Grid style={{ height: '100%' }} container direction="row">
        {disableSidebar ? null : isMobile ? (
          <Collapse orientation={'vertical'} in={showSidebar}>
            <Grid item xs={12}>
              <Sidebar />
            </Grid>
          </Collapse>
        ) : showSidebar ? (
          <Grid item md={4}>
            <Sidebar />
          </Grid>
        ) : null}

        <Grid item xs style={{ flexGrow: 1 }}>
          {loading ? (
            <Grid item xs={12} style={{ position: 'relative' }}>
              <LinearProgress style={{ position: 'absolute', left: 0, right: 0 }} />
            </Grid>
          ) : (
            <Items results={results} />
          )}
        </Grid>
      </Grid>
    </Header>
  )
}
