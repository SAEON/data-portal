import { useState, useEffect, useContext, useRef } from 'react'
import Header from './header'
import Filters from './filters'
import Records from './records'
import { GlobalContext } from '../../../contexts/global'
import { Typography, Grid, Collapse } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import Footer from '../../../components/footer'
import Loading from '../../../components/loading'
import { useCatalogue as WithCatalogue } from '../../../hooks'
import { getUriState } from '../../../lib/fns'

const DEFAULT_CURSORS = {
  start: undefined,
  end: undefined,
  currentPage: 0,
}

export default ({ disableSidebar = false }) => {
  const [showSidebar, setShowSidebar] = useState(!disableSidebar && !isMobile)
  const ref = useRef()
  const [pageSize, setPageSize] = useState(20)
  const [cursors, setCursors] = useState(DEFAULT_CURSORS)

  const showTopMenu = !window.location.pathname.includes('/render')
  const { showSearchBar } = getUriState()

  const { global } = useContext(GlobalContext)
  const { terms, extent = undefined, text = undefined, ids } = global

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

  /**
   * cursors.start is only set when navigating BACK,
   * data items must be reversed when paged BACK
   */

  return (
    <WithCatalogue
      pageSize={pageSize}
      startCursor={cursors.start}
      endCursor={cursors.end}
      ids={ids}
      terms={terms}
      extent={extent}
      text={text}
    >
      {({ error, loading, data }) => {
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
            <div
              style={{
                minHeight: `calc(${window.innerHeight}px - ${showTopMenu ? 48 : 0}px - ${
                  showSearchBar === 'true' || !showSearchBar ? '128' : '0'
                }px - 48px - 49px)`,
              }}
            >
              <Grid container direction="row" justify="center">
                {loading ? (
                  <Grid item xs={12} style={{ position: 'relative' }}>
                    <Loading />
                  </Grid>
                ) : (
                  <>
                    {isMobile ? (
                      // Mobile
                      <>
                        {disableSidebar ? null : (
                          <Collapse unmountOnExit orientation={'vertical'} in={showSidebar}>
                            <Grid item xs={12}>
                              <Filters catalogue={data?.catalogue} />
                            </Grid>
                          </Collapse>
                        )}

                        <Grid item xs style={{ flexGrow: 1 }}>
                          <Records results={results} />
                        </Grid>
                      </>
                    ) : (
                      // Tablet +
                      <Grid
                        item
                        xs={12}
                        style={{
                          justifyContent: 'center',
                          display: 'flex',
                          margin: '32px 0 16px 0',
                        }}
                      >
                        <Grid container item lg={10} xl={8}>
                          {showSidebar ? (
                            <Grid style={{ paddingRight: 16 }} item md={4}>
                              <Filters catalogue={data?.catalogue} />
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
        )
      }}
    </WithCatalogue>
  )
}
