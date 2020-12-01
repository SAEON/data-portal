import { AppBar, Toolbar, Grid } from '@material-ui/core'
import { isMobile } from 'react-device-detect'
import Title from './_title'
import ToggleFiltersButton from './_toggle-filters-button'
import RefreshSelectionButton from './_reset-selection-button'
import CreateDatabookButton from './_create-databook-button'
import CreateAtlasButton from './_create-atlas-button'
import CreateListButton from './_create-list-button'
import ConfigurePaginationButton from './_configure-pagination-button'
import PageBackButton from './_page-back-button'
import PageForwardButton from './_page-forward-button'
import CurrentPageInfo from './_current-page-info'
import DownloadRecords from './_download-records-button'

export default ({
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
}) => {
  return (
    <>
      <AppBar color="inherit" position="sticky" variant="outlined">
        <Toolbar disableGutters variant="dense" style={{ display: 'flex' }}>
          <Grid container>
            {/* LEFT */}
            <Grid item xs={1} sm={4}>
              {isMobile && !disableSidebar ? (
                <ToggleFiltersButton setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
              ) : undefined}
            </Grid>

            {/* CENTER */}
            <Grid item xs={3} sm={4} container justify="center" alignContent="center">
              {!isMobile && <Title catalogue={catalogue} />}
            </Grid>

            {/* RIGHT */}
            <Grid item xs={8} sm={4} container justify="flex-end" alignItems="center">
              <RefreshSelectionButton />
              <CreateDatabookButton catalogue={catalogue} />
              <DownloadRecords catalogue={catalogue} />
              <CreateAtlasButton catalogue={catalogue} />
              <CreateListButton catalogue={catalogue} />
              {!isMobile && (
                <ConfigurePaginationButton pageSize={pageSize} setPageSize={setPageSize} />
              )}
              <PageBackButton
                setCursors={setCursors}
                loading={loading}
                cursors={cursors}
                catalogue={catalogue}
              />
              {!isMobile && (
                <CurrentPageInfo catalogue={catalogue} pageSize={pageSize} cursors={cursors} />
              )}
              <PageForwardButton
                setCursors={setCursors}
                loading={loading}
                cursors={cursors}
                catalogue={catalogue}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {children}
    </>
  )
}
