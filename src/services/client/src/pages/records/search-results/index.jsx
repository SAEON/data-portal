import { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react'
import { useQuery } from '@apollo/client'
import Header from './header'
import Records from './records'
import { context as globalContext } from '../../../contexts/global'
import Grid from '@material-ui/core/Grid'
import { isMobile } from 'react-device-detect'
import Footer from '../../../components/footer'
import Loading from '../../../components/loading'
import getUriState from '../../../lib/fns/get-uri-state'
import { gql } from '@apollo/client'
import { CATALOGUE_CLIENT_FILTER_CONFIG } from '../../../config'

const MobileSideMenu = lazy(() => import('./_side-menu'))
const Filters = lazy(() => import('./filters'))

const DEFAULT_CURSORS = {
  start: undefined,
  end: undefined,
  currentPage: 0,
}

export default ({ disableSidebar = false }) => {
  const [showSidebar, setShowSidebar] = useState(!disableSidebar && !isMobile)
  const ref = useRef()
  const mainRef = useRef()
  const [pageSize, setPageSize] = useState(20)
  const [cursors, setCursors] = useState(DEFAULT_CURSORS)
  const showTopMenu = !window.location.pathname.includes('/render')
  const { showSearchBar, referrer } = getUriState()
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
      query(
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
          records(
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
            nodes {
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
    return <Loading />
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
    ? data.catalogue.records.nodes.slice(0).reverse()
    : data.catalogue.records.nodes

  return (
    <main id="search-results" ref={el => (mainRef.current = el)}>
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
        ref={mainRef}
      >
        <div
          style={{
            minHeight: `calc(${window.innerHeight}px - ${showTopMenu ? 48 : 0}px - ${
              showSearchBar === 'true' || !showSearchBar ? '128' : '0'
            }px - 48px - 49px)`,
          }}
        >
          <Grid container direction="row" justify="center">
            {/* SEARCH LOADING */}
            {loading && (
              <Grid item xs={12} style={{ position: 'relative' }}>
                <Loading />
              </Grid>
            )}

            {/* SEARCH RESULTS & HEADER */}
            {!loading && (
              <>
                {/* MOBILE */}
                {isMobile && (
                  <>
                    {!disableSidebar && (
                      <Suspense fallback={<Loading />}>
                        <MobileSideMenu
                          setShowSidebar={setShowSidebar}
                          showSidebar={showSidebar}
                          data={data}
                        />
                      </Suspense>
                    )}

                    <Grid item xs style={{ flexGrow: 1 }}>
                      <Records results={results} />
                    </Grid>
                  </>
                )}

                {/* LARGER SCREENS */}
                {!isMobile && (
                  <Grid
                    item
                    xs={12}
                    style={{
                      justifyContent: 'center',
                      display: 'flex',
                      margin: '32px 0 16px 0',
                    }}
                  >
                    {/* TODO should be container */}
                    <Grid container item lg={10} xl={8}>
                      {showSidebar ? (
                        <Grid style={{ paddingRight: 16 }} item md={4}>
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
                      ) : null}
                      <Grid item xs style={{ flexGrow: 1 }}>
                        <Records results={results} />
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </div>
        {loading ? undefined : <Footer />}
      </Header>
    </main>
  )
}
