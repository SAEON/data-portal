import { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react'
import { useQuery } from '@apollo/client'
import Header from './header'
import Records from './records'
import { context as globalContext } from '../../../contexts/global'
import Grid from '@mui/material/Grid'
import Loading from '../../../components/loading'
import getUriState from '../../../lib/fns/get-uri-state'
import { gql } from '@apollo/client'
import { CATALOGUE_CLIENT_FILTER_CONFIG } from '../../../config'
import Container from '@mui/material/Container'
import Hidden from '@mui/material/Hidden'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const MobileSideMenu = lazy(() => import('./_side-menu'))
const Filters = lazy(() => import('./filters'))

const DEFAULT_CURSORS = {
  start: undefined,
  end: undefined,
  currentPage: 0,
}

export default ({ showSearch, showSidebar }) => {
  const theme = useTheme()
  const xsDown = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const smDown = useMediaQuery(theme => theme.breakpoints.down('md'))
  const [sidebarVisible, setSidebarVisible] = useState(!showSidebar && !xsDown)
  const ref = useRef()
  const [pageSize, setPageSize] = useState(20)
  const [cursors, setCursors] = useState(DEFAULT_CURSORS)
  const { referrer } = getUriState()
  const { global } = useContext(globalContext)
  const { terms, extent = undefined, text = undefined, ids = [], dois = [] } = global

  useEffect(() => {
    if (ref.current) {
      if (
        terms?.length !== ref.current.terms?.length ||
        text !== ref.current.text ||
        extent !== ref.current.extent
      ) {
        setCursors(DEFAULT_CURSORS)
      }
    }
    ref.current = { terms, text, extent }
  }, [terms, extent, text])

  const { error, loading, data } = useQuery(
    gql`
      query (
        $extent: WKT_4326
        $text: String
        $terms: [TermInput!]
        $size: Int
        $before: String
        $after: String
        $fields: [FieldInput!]
        $summaryLimit: Int
        $ids: [ID!]
        $dois: [String!]
        $referrer: String
      ) {
        catalogue(referrer: $referrer) {
          id
          summary(
            fields: $fields
            filterByText: $text
            filterByExtent: $extent
            filterByTerms: $terms
            limit: $summaryLimit
            filterByIds: $ids
            filterByDois: $dois
          )
          search(
            extent: $extent
            text: $text
            terms: $terms
            size: $size
            before: $before
            after: $after
            ids: $ids
            dois: $dois
          ) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            totalCount
            records {
              metadata
            }
          }
        }
      }
    `,
    {
      variables: {
        fields: [
          {
            id: '_linked-resources-filter',
            field: 'linkedResources.linkedResourceType.raw',
            path: 'linkedResources',
          },
          ...CATALOGUE_CLIENT_FILTER_CONFIG.map(
            ({ id, field, path, filters, sortBy, sortOrder }) => {
              return { id, field, path, filters, sortBy, sortOrder }
            }
          ),
        ],
        ids,
        dois,
        extent,
        terms: terms.map(({ field, boost, value }) => ({ field, boost, value })),
        text,
        size: pageSize,
        after: cursors.end,
        before: cursors.start,
        summaryLimit: 75,
        referrer,
      },
    }
  )

  if (loading) {
    return <Loading withHeight />
  }

  if (error) {
    throw new Error(
      `Error searching catalogue: ${error}\n\nPlease check Elasticsearch configuration`
    )
  }
  /**
   * cursors.start is only set when navigating BACK,
   * data items must be reversed when paged BACK
   */
  const results = cursors.start
    ? data.catalogue.search.records.slice(0).reverse()
    : data.catalogue.search.records

  return (
    <main id="search-results">
      <Header
        showSidebar={showSidebar}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        cursors={cursors}
        setCursors={setCursors}
        setPageSize={setPageSize}
        pageSize={pageSize}
        loading={loading}
        catalogue={data?.catalogue}
      >
        <Hidden mdDown>
          <div style={{ marginTop: theme.spacing(2) }} />
        </Hidden>
        <Container disableGutters={smDown} style={{ minHeight: 1000 }}>
          {/* SEARCH LOADING */}
          {loading && (
            <Grid item xs={12} style={{ position: 'relative' }}>
              <Loading />
            </Grid>
          )}

          {/* SEARCH RESULTS & HEADER */}
          {loading ? null : (
            <>
              {/* MOBILE */}
              <Hidden mdUp>
                <>
                  {!showSidebar && (
                    <Suspense fallback={<Loading />}>
                      <MobileSideMenu
                        setShowSidebar={setSidebarVisible}
                        showSidebar={sidebarVisible}
                        data={data}
                      />
                    </Suspense>
                  )}

                  <Records results={results} />
                </>
              </Hidden>

              {/* LARGER SCREENS */}
              <Hidden mdDown>
                <Grid container spacing={2}>
                  {sidebarVisible && !showSidebar && (
                    <Grid item md={4}>
                      <Suspense
                        fallback={
                          <div style={{ position: 'relative' }}>
                            <Loading />
                          </div>
                        }
                      >
                        <Filters catalogue={data?.catalogue} />
                      </Suspense>
                    </Grid>
                  )}
                  <Grid item xs style={{ flexGrow: 1 }}>
                    <Records results={results} />
                  </Grid>
                </Grid>
              </Hidden>
            </>
          )}
        </Container>
      </Header>
    </main>
  )
}
