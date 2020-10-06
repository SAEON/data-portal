import React, { useState, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Badge,
  Grid,
  CircularProgress,
  Fade,
} from '@material-ui/core'
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  ArrowDropDown as ArrowDropDownIcon,
  FilterList as FilterIcon,
  Map as MapIcon,
  List as ListIcon,
  Refresh as RefreshIcon,
} from '@material-ui/icons'
import { isMobile } from 'react-device-detect'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../../modules/provider-global'
import ShareOrEmbed from '../share-or-embed'
import WithPersistSearch from '../../hooks/_persist-search'

const pageSizes = [
  10,
  20,
  50,
  100,
  200,
  // 'ALL'
]

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
  const [anchorEl, setAnchorEl] = useState(null)
  const { global, setGlobal } = useContext(GlobalContext)
  const { selectedDois } = global

  const resultsWithDOIs =
    catalogue?.summary
      .find(obj => Object.entries(obj).find(([k]) => k === 'identifier.identifierType.raw'))
      ['identifier.identifierType.raw'].find(({ key }) => key === 'DOI')?.doc_count || 0

  return (
    <>
      <AppBar color="inherit" position="sticky" variant="outlined">
        <Toolbar disableGutters variant="dense" style={{ display: 'flex' }}>
          <Grid container>
            <Grid item xs={1} sm={4}>
              {isMobile && !disableSidebar ? (
                <IconButton
                  style={{ marginLeft: 5 }}
                  onClick={() => setShowSidebar(!showSidebar)}
                  color={showSidebar ? 'primary' : 'inherit'}
                >
                  <FilterIcon />
                </IconButton>
              ) : undefined}
            </Grid>

            {/* RESULT CONTEXT */}
            <Grid item xs={3} sm={4} container justify="center" alignContent="center">
              {isMobile ? null : (
                <Typography component="div" variant="overline" noWrap style={{ display: 'flex' }}>
                  {catalogue?.records ? `${catalogue.records.totalCount}` : '...'} Records
                </Typography>
              )}
            </Grid>

            {/* TOOLS */}
            <Grid item xs={8} sm={4} container justify="flex-end" alignItems="center">
              {/* REFRESH DATA SELECTION */}
              <Tooltip title={`Unselect all datasets`}>
                <span style={{ display: 'flex', alignContent: 'center' }}>
                  <IconButton
                    disabled={!selectedDois?.length}
                    onClick={() => {
                      setGlobal({ selectedDois: [] })
                    }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </span>
              </Tooltip>

              {/* PREVIEW ALL DATASETS */}
              <Tooltip title={`Configure atlas from ${resultsWithDOIs} datasets`}>
                <span style={{ display: 'flex', alignContent: 'center' }}>
                  <WithPersistSearch>
                    {([persistSearchState, { loading, error, data }]) => {
                      const history = useHistory()

                      if (error) {
                        throw new Error('Error persiting search state', error)
                      }

                      if (data) {
                        const searchId = data.browserClient.persistSearchState
                        history.push({
                          pathname: 'atlas',
                          search: `?search=${searchId}`,
                        })
                      }

                      if (loading || data) {
                        return (
                          <Fade in={loading || data}>
                            <CircularProgress thickness={2} size={16} style={{ marginRight: 8 }} />
                          </Fade>
                        )
                      }

                      return (
                        <Fade in={!loading && !error}>
                          <IconButton
                            disabled={!(selectedDois?.length || resultsWithDOIs)}
                            onClick={() => {
                              persistSearchState({
                                variables: {
                                  state: selectedDois.length ? { dois: selectedDois } : global,
                                },
                              })
                            }}
                          >
                            <Badge
                              color={
                                selectedDois?.length || resultsWithDOIs ? 'primary' : 'default'
                              }
                              badgeContent={selectedDois?.length || resultsWithDOIs || 0}
                              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                              invisible={false}
                            >
                              <MapIcon />
                            </Badge>
                          </IconButton>
                        </Fade>
                      )
                    }}
                  </WithPersistSearch>
                </span>
              </Tooltip>

              {/* SHOW SELECTED DATASETS AS LIST */}
              <ShareOrEmbed
                state={selectedDois.length ? { dois: selectedDois } : global}
                icon={<ListIcon />}
                iconProps={{
                  color: 'default',
                  disabled: !(selectedDois?.length || resultsWithDOIs),
                  style: { marginRight: 10 },
                }}
                tooltipProps={{
                  title: `Share list of ${
                    selectedDois?.length || resultsWithDOIs
                  } selected datasets`,
                  placement: 'bottom',
                }}
                badgeProps={{
                  color: selectedDois?.length || resultsWithDOIs ? 'primary' : 'default',
                  badgeContent: selectedDois?.length || resultsWithDOIs || 0,
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                  invisible: false,
                }}
              />

              {/* PAGINATION CONFIG */}
              {isMobile ? null : (
                <>
                  <Button
                    variant="text"
                    disableElevation
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    endIcon={<ArrowDropDownIcon />}
                    onClick={event => {
                      setAnchorEl(event.currentTarget)
                    }}
                  >
                    {pageSize}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted={false}
                    open={Boolean(anchorEl)}
                    onClose={() => {
                      setAnchorEl(null)
                    }}
                  >
                    {pageSizes.map(x => (
                      <Tooltip key={x} title={x === 'ALL' ? 'Warning - this can be slow' : ''}>
                        <MenuItem
                          style={x === 'ALL' ? { color: 'red' } : {}}
                          onClick={() => {
                            setPageSize(x === 'ALL' ? 10000 : x)
                            setAnchorEl(null)
                          }}
                        >
                          {x}
                        </MenuItem>
                      </Tooltip>
                    ))}
                  </Menu>
                </>
              )}

              {/* Go Back a page */}
              <IconButton
                disabled={loading ? true : cursors?.currentPage < 1}
                onClick={() => {
                  setCursors({
                    start: catalogue?.records?.pageInfo?.startCursor,
                    end: undefined,
                    currentPage: cursors?.currentPage - 1,
                  })
                }}
              >
                <NavigateBeforeIcon />
              </IconButton>

              {isMobile ? null : (
                <Typography variant="overline" noWrap>
                  {catalogue?.records
                    ? `${cursors.currentPage * pageSize + 1} - ${Math.min(
                        cursors.currentPage * pageSize + pageSize,
                        catalogue.records.totalCount
                      )}`
                    : '... ...'}
                </Typography>
              )}

              {/* Go forward a page */}
              <IconButton
                disabled={
                  loading
                    ? true
                    : cursors?.currentPage * pageSize + pageSize >= catalogue?.records?.totalCount
                }
                onClick={() => {
                  setCursors({
                    start: undefined,
                    end: catalogue?.records?.pageInfo?.endCursor,
                    currentPage: cursors?.currentPage + 1,
                  })
                }}
                style={{ marginRight: 5 }}
              >
                <NavigateNextIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {children}
    </>
  )
}
