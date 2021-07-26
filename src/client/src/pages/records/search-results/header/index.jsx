import { Suspense, lazy, useContext, cloneElement, forwardRef } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useTheme from '@material-ui/core/styles/useTheme'
import { isMobile } from 'react-device-detect'
import ToggleFiltersButton from './_toggle-filters-button'
import ToggleSelectionButton from './_toggle-select-button'
import CreateListButton from './_create-list-button'
import PageBackButton from './_page-back-button'
import PageForwardButton from './_page-forward-button'
import LoadingCircular from '../../../../components/loading-circular'
import { context as authorizationContext } from '../../../../contexts/authorization'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
// import ResetFiltersButton from './_reset-filters-button'

const AuthenticatedOnly = lazy(() => import('./authenticated'))
const ConfigurePaginationButton = lazy(() => import('./_configure-pagination-button'))
const CurrentPageInfo = lazy(() => import('./_current-page-info'))
const Title = lazy(() => import('./_title'))

const ElevationScroll = forwardRef(({ children }, ref) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: ref.current?.offsetTop || 200,
  })

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
})

export default forwardRef(
  (
    {
      catalogue,
      setPageSize,
      loading,
      cursors,
      setCursors,
      pageSize,
      disableSidebar,
      children,
      showSidebar,
      setShowSidebar,
    },
    ref
  ) => {
    const { isAuthenticated } = useContext(authorizationContext)
    const theme = useTheme()

    return (
      <>
        <ElevationScroll ref={ref}>
          <AppBar color="inherit" position="sticky" style={{ zIndex: 1200 }}>
            <Toolbar disableGutters variant="dense" style={{ borderBottom: 'none' }}>
              {/* MOBILE FILTER TOGGLE */}
              {isMobile && !disableSidebar ? (
                <ToggleFiltersButton setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
              ) : undefined}

              {/* SEARCH RESULT COUNT */}
              {!isMobile && (
                <Suspense fallback={<LoadingCircular />}>
                  <Title style={{ marginLeft: theme.spacing(2) }} catalogue={catalogue} />
                </Suspense>
              )}

              <span style={{ marginLeft: 'auto' }} />

              {/* ATLAS and DATABOOK */}
              {!isMobile && isAuthenticated && (
                <Suspense fallback={<LoadingCircular />}>
                  <AuthenticatedOnly catalogue={catalogue} />
                </Suspense>
              )}

              {/* CREATE LIST */}
              <CreateListButton catalogue={catalogue} />

              {/* RESET SELECTION */}
              <ToggleSelectionButton catalogue={catalogue} />

              {/* RESET FILTERS */}
              {/* <ResetFiltersButton /> */}

              {/* PAGINATION CONFIG */}
              {!isMobile && (
                <Suspense fallback={<LoadingCircular />}>
                  <ConfigurePaginationButton pageSize={pageSize} setPageSize={setPageSize} />
                </Suspense>
              )}

              {/* PAGE BACK */}
              <PageBackButton
                setCursors={setCursors}
                loading={loading}
                cursors={cursors}
                catalogue={catalogue}
              />

              {/* CURRENT PAGE */}
              {!isMobile && (
                <Suspense fallback={<LoadingCircular />}>
                  <CurrentPageInfo catalogue={catalogue} pageSize={pageSize} cursors={cursors} />
                </Suspense>
              )}

              {/* PAGE FORWARD */}
              <PageForwardButton
                setCursors={setCursors}
                loading={loading}
                cursors={cursors}
                pageSize={pageSize}
                catalogue={catalogue}
              />
            </Toolbar>
          </AppBar>
        </ElevationScroll>

        {children}
      </>
    )
  }
)
