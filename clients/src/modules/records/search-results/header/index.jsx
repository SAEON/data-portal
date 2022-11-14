import { Suspense, lazy, useContext } from 'react'
import ToggleSelectionButton from './_toggle-select-button'
import CreateListButton from './create-list-button'
import PageBackButton from './_page-back-button'
import PageForwardButton from './_page-forward-button'
import LoadingCircular from '../../../../components/loading-circular'
import { context as authorizationContext } from '../../../../contexts/authorization'
import Hidden from '@mui/material/Hidden'
import ToolbarHeader from '../../../../components/toolbar-header'
import Divider from '@mui/material/Divider'
import Search from '../../../../components/search'
import { Span } from '../../../../components/html-tags'

const AuthenticatedOnly = lazy(() => import('./authenticated'))
const ConfigurePaginationButton = lazy(() => import('./_configure-pagination-button'))
const CurrentPageInfo = lazy(() => import('./_current-page-info'))
const Title = lazy(() => import('./_title'))

export default ({
  catalogue,
  setPageSize,
  loading,
  cursors,
  setCursors,
  pageSize,
  children,
  showSearch,
}) => {
  const { isAuthenticated } = useContext(authorizationContext)

  return (
    <>
      <ToolbarHeader>
        {/* SEARCH RESULT COUNT */}
        <Hidden smDown>
          <Suspense fallback={<LoadingCircular />}>
            <Title sx={{ ml: theme => theme.spacing(2) }} catalogue={catalogue} />
          </Suspense>
        </Hidden>

        {/* SEARCH */}
        {showSearch && (
          <>
            <Divider
              orientation="vertical"
              flexItem
              sx={theme => ({
                mr: theme => theme.spacing(2),
                visiblity: 'hidden',
                [theme.breakpoints.up('sm')]: {
                  visiblity: 'unset',
                  mx: theme => theme.spacing(2),
                },
              })}
            />
            <Search />
            <Span sx={{ mr: theme => theme.spacing(2) }} />
          </>
        )}

        <Span sx={{ ml: 'auto' }} />

        {/* AUTHENTICATED */}
        {isAuthenticated && (
          <Hidden smDown>
            <Suspense fallback={<LoadingCircular />}>
              <AuthenticatedOnly catalogue={catalogue} />
            </Suspense>
            <Span sx={{ ml: theme => theme.spacing(0.5) }} />
          </Hidden>
        )}

        {/* CREATE LIST */}
        <CreateListButton catalogue={catalogue} />

        {/* RESET SELECTION */}
        <ToggleSelectionButton catalogue={catalogue} />

        {/* PAGINATION CONFIG */}

        <Hidden smDown>
          <Suspense fallback={<LoadingCircular />}>
            <ConfigurePaginationButton pageSize={pageSize} setPageSize={setPageSize} />
          </Suspense>
        </Hidden>

        {/* PAGE BACK */}
        <PageBackButton
          setCursors={setCursors}
          loading={loading}
          cursors={cursors}
          catalogue={catalogue}
        />

        {/* CURRENT PAGE */}
        <Hidden smDown>
          <Suspense fallback={<LoadingCircular />}>
            <CurrentPageInfo catalogue={catalogue} pageSize={pageSize} cursors={cursors} />
          </Suspense>
        </Hidden>

        {/* PAGE FORWARD */}
        <PageForwardButton
          setCursors={setCursors}
          loading={loading}
          cursors={cursors}
          pageSize={pageSize}
          catalogue={catalogue}
        />
      </ToolbarHeader>
      {children}
    </>
  )
}
