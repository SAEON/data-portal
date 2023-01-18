import { useState, useEffect, useContext, useRef, lazy, Suspense } from 'react'
import { useQuery } from '@apollo/client'
import Header from './header'
import Records from './records'
import { context as searchContext } from '../../../contexts/search'
import { context as referrerContext } from '../../../contexts/referrer'
import { context as clientContext } from '../../../contexts/client-info'
import Grid from '@mui/material/Grid'
import Loading from '../../../components/loading'
import { gql } from '@apollo/client'
import { CLIENT_FACET_CONFIGURATION, CLIENTS_PUBLIC_ADDRESS } from '../../../config'
import Container from '@mui/material/Container'
import Hidden from '@mui/material/Hidden'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Div, Main } from '../../../components/html-tags'
import Fade from '@mui/material/Fade'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

const Filters = lazy(() => import('./filters'))

const DEFAULT_CURSORS = {
  start: undefined,
  end: undefined,
  currentPage: 0,
}

export default ({ showSearch, showSidebar }) => {
  const xsDown = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const smDown = useMediaQuery(theme => theme.breakpoints.down('md'))
  const ref = useRef()
  const [pageSize, setPageSize] = useState(20)
  const [cursors, setCursors] = useState(DEFAULT_CURSORS)
  const { referrer } = useContext(referrerContext)
  const { global } = useContext(searchContext)
  const { renderedPage } = useContext(clientContext)
  const { terms, extent = undefined, text = undefined, ids = [], dois = [], filter = {} } = global
  const sidebarVisible = !showSidebar && !xsDown

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
        $filter: JSON
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
            listFilter: $filter
            limit: $summaryLimit
            filterByIds: $ids
            filterByDois: $dois
          )
          search(
            extent: $extent
            text: $text
            terms: $terms
            size: $size
            filter: $filter
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
              downloadCount
            }
          }
        }
      }
    `,
    {
      variables: {
        fields: CLIENT_FACET_CONFIGURATION,
        ids,
        dois,
        extent,
        filter,
        terms: terms.map(({ field, boost, value, filterId: id }) => ({ id, field, boost, value })),
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
    return <Loading withHeight sx={{ position: 'fixed' }} />
  }

  if (error) {
    throw new Error(`Error searching catalogue: ${error}`)
  }

  /**
   * cursors.start is only set when navigating BACK,
   * data items must be reversed when paged BACK
   */
  const results = cursors.start
    ? data.catalogue.search.records.slice(0).reverse()
    : data.catalogue.search.records

  return (
    <Fade key="search-results" in>
      <Main id="search-results">
        <Header
          cursors={cursors}
          setCursors={setCursors}
          setPageSize={setPageSize}
          pageSize={pageSize}
          loading={loading}
          catalogue={data?.catalogue}
          showSearch={showSearch}
        >
          {renderedPage === 'list' && (
            <Tooltip title="Navigate to the main SAEON catalogue" placement="top-start">
              <Typography
                component={Link}
                href={CLIENTS_PUBLIC_ADDRESS}
                target="_blank"
                rel="noopener noreferrer"
                variant="body2"
                sx={theme => ({
                  background: theme => theme.palette.common.white,
                  display: 'flex',
                  flexDirection: 'row-reverse',
                  py: theme => theme.spacing(0.5),
                  px: theme => theme.spacing(1),
                  [theme.breakpoints.up('md')]: {
                    mx: theme => theme.spacing(3),
                    mt: theme => theme.spacing(2),
                    display: 'inline-block',
                    flexDirection: 'unset',
                    float: 'right',
                  },
                  [theme.breakpoints.up('lg')]: {
                    m: 0,
                  },
                })}
              >
                View full catalogue
              </Typography>
            </Tooltip>
          )}
          <Hidden mdDown>
            <Div sx={{ mt: theme => theme.spacing(2) }} />
          </Hidden>
          <Container disableGutters={smDown} sx={{ minHeight: 1000 }}>
            {/* SEARCH LOADING */}
            {loading && (
              <Grid item xs={12} sx={{ position: 'relative' }}>
                <Loading />
              </Grid>
            )}

            {/* SEARCH RESULTS & HEADER */}
            {loading ? null : (
              <>
                {/* MOBILE and TABLET */}
                <Hidden mdUp>
                  <Records results={results} />
                </Hidden>

                {/* LARGER SCREENS */}
                <Hidden mdDown>
                  <Grid container spacing={2}>
                    {sidebarVisible && !showSidebar && (
                      <Grid item md={4}>
                        <Suspense
                          fallback={
                            <Div sx={{ position: 'relative' }}>
                              <Loading />
                            </Div>
                          }
                        >
                          <Filters catalogue={data?.catalogue} />
                        </Suspense>
                      </Grid>
                    )}
                    <Grid item xs sx={{ flexGrow: 1, minWidth: '1px' }}>
                      <Records results={results} />
                    </Grid>
                  </Grid>
                </Hidden>
              </>
            )}
          </Container>
        </Header>
      </Main>
    </Fade>
  )
}
