import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useTheme from '@material-ui/core/styles/useTheme'
import { isMobile } from 'react-device-detect'
import Title from './_title'
import ToggleFiltersButton from './_toggle-filters-button'
import ToggleSelectionButton from './_toggle-select-button'
import CreateDatabookButton from './_create-databook-button'
import CreateAtlasButton from './create-atlas-button'
import CreateListButton from './_create-list-button'
import ConfigurePaginationButton from './_configure-pagination-button'
import PageBackButton from './_page-back-button'
import PageForwardButton from './_page-forward-button'
import CurrentPageInfo from './_current-page-info'
import DownloadRecords from './_download-records-button'
// import ResetFiltersButton from './_reset-filters-button'

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
  const theme = useTheme()

  return (
    <>
      <AppBar color="inherit" position="sticky" variant="outlined">
        <Toolbar disableGutters variant="dense">
          {/* MOBILE FILTER TOGGLE */}
          {isMobile && !disableSidebar ? (
            <ToggleFiltersButton setShowSidebar={setShowSidebar} showSidebar={showSidebar} />
          ) : undefined}

          {/* SEARCH RESULT COUNT */}
          {!isMobile && <Title style={{ marginLeft: theme.spacing(2) }} catalogue={catalogue} />}

          <span style={{ marginLeft: 'auto' }} />

          {/* CREATE DATABOOK */}
          {!isMobile && <CreateDatabookButton catalogue={catalogue} />}

          {/* DOWNLOAD METADATA RECORDS */}
          {!isMobile && <DownloadRecords catalogue={catalogue} />}

          {/* CREATE ATLAS */}
          {!isMobile && <CreateAtlasButton catalogue={catalogue} />}

          {/* CREATE LIST */}
          <CreateListButton catalogue={catalogue} />

          {/* RESET SELECTION */}
          <ToggleSelectionButton catalogue={catalogue} />

          {/* RESET FILTERS */}
          {/* <ResetFiltersButton /> */}

          {/* PAGINATION CONFIG */}
          {!isMobile && <ConfigurePaginationButton pageSize={pageSize} setPageSize={setPageSize} />}

          {/* PAGE BACK */}
          <PageBackButton
            setCursors={setCursors}
            loading={loading}
            cursors={cursors}
            catalogue={catalogue}
          />

          {/* CURRENT PAGE */}
          {!isMobile && (
            <CurrentPageInfo catalogue={catalogue} pageSize={pageSize} cursors={cursors} />
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
      {children}
    </>
  )
}
