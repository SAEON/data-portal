import React, { useState, forwardRef } from 'react'
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  Collapse,
  Link,
} from '@material-ui/core'
import {
  Search as SearchIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  ArrowDropDown as ArrowDropDownIcon,
  FilterList as FilterIcon,
  Share as ShareIcon,
} from '@material-ui/icons'
import { debounce } from '../../lib/fns'
import { CLIENT_HOST_ADDRESS } from '../../config'
import QuickForm from '@saeon/quick-form'
import { isMobile } from 'react-device-detect'

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
  error,
  cursors,
  setCursors,
  textSearch,
  setTextSearch,
  pageSize,
  Sidebar,
  ResultList,
  headerColor,
  hideSidebar,
  disableSidebar,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [showSidebar, setShowSidebar] = useState(disableSidebar === true ? false : !hideSidebar)

  return (
    <>
      <AppBar
        color={headerColor}
        position="sticky"
        style={{ zIndex: 1101, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        variant="outlined"
      >
        <Toolbar variant="regular">
          {disableSidebar ? null : (
            <IconButton
              onClick={() => setShowSidebar(!showSidebar)}
              color={showSidebar ? 'primary' : 'inherit'}
            >
              <FilterIcon />
            </IconButton>
          )}

          {/* TEXT SEARCH */}
          <div style={{ flexGrow: 10, margin: '0 20px' }}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item style={{ flex: 1 }}>
                <QuickForm
                  effects={[debounce(({ value }) => setTextSearch(value), 250)]}
                  value={textSearch}
                >
                  {({ updateForm, value }) => (
                    <TextField
                      autoComplete="off"
                      fullWidth
                      id="outlined-basic"
                      size="small"
                      color="secondary"
                      value={value}
                      onChange={e => updateForm({ value: e.currentTarget.value })}
                      placeholder="Filter current page results..."
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </QuickForm>
              </Grid>
            </Grid>
          </div>

          {/* RESULT CONTEXT */}
          {isMobile ? null : (
            <Typography variant="overline" noWrap>
              {`${cursors.currentPage * pageSize + 1} to ${
                catalogue?.records
                  ? Math.min(
                      cursors.currentPage * pageSize + pageSize,
                      catalogue.records.totalCount
                    )
                  : '..'
              } of ${catalogue?.records ? catalogue.records.totalCount : '..'} results`}
            </Typography>
          )}

          {/* SHARE LINK */}
          <div style={{ flexGrow: 1, textAlign: 'center' }}>
            <Tooltip title="Share result list">
              <Link
                component={forwardRef((props, ref) => (
                  <IconButton
                    ref={ref}
                    href={`${CLIENT_HOST_ADDRESS}/render/catalogue-results-view${
                      window.location.search || '?terms='
                    }&disableSidebar=true`}
                    target="_blank"
                    rel="noreferrer"
                    color="primary"
                    {...props}
                  >
                    <ShareIcon />
                  </IconButton>
                ))}
              />
            </Tooltip>
          </div>

          {isMobile ? null : (
            <>
              <Button
                size="small"
                variant="text"
                style={{ marginRight: 5 }}
                aria-controls="simple-menu"
                aria-haspopup="true"
                endIcon={<ArrowDropDownIcon />}
                onClick={event => {
                  setAnchorEl(event.currentTarget)
                }}
                color="inherit"
              >
                Show {pageSize} results
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

          {isMobile ? (
            <IconButton
              size="small"
              disabled={loading || error ? true : cursors?.currentPage < 1}
              onClick={() => {
                setCursors({
                  start: catalogue?.records?.pageInfo?.startCursor,
                  end: undefined,
                  currentPage: cursors?.currentPage - 1,
                })
              }}
              color="inherit"
            >
              <NavigateBeforeIcon />
            </IconButton>
          ) : (
            <Button
              variant="text"
              style={{ marginRight: 5 }}
              disabled={loading || error ? true : cursors?.currentPage < 1}
              size="small"
              startIcon={<NavigateBeforeIcon />}
              onClick={() => {
                setCursors({
                  start: catalogue?.records?.pageInfo?.startCursor,
                  end: undefined,
                  currentPage: cursors?.currentPage - 1,
                })
              }}
              color="inherit"
            >
              Previous
            </Button>
          )}

          {isMobile ? (
            <IconButton
              size="small"
              disabled={
                loading || error
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
              color="inherit"
            >
              <NavigateNextIcon />
            </IconButton>
          ) : (
            <Button
              variant="text"
              size="small"
              disabled={
                loading || error
                  ? true
                  : cursors?.currentPage * pageSize + pageSize >= catalogue?.records?.totalCount
              }
              endIcon={<NavigateNextIcon />}
              onClick={() => {
                setCursors({
                  start: undefined,
                  end: catalogue?.records?.pageInfo?.endCursor,
                  currentPage: cursors?.currentPage + 1,
                })
              }}
              color="inherit"
            >
              Next
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Grid container>
        {disableSidebar ? null : isMobile ? (
          <Collapse orientation={'vertical'} in={showSidebar}>
            <Grid item xs={12}>
              <Sidebar />
            </Grid>
          </Collapse>
        ) : showSidebar ? ( // TODO https://github.com/mui-org/material-ui/pull/20619
          <Grid item md={4}>
            <Sidebar />
          </Grid>
        ) : null}

        <Grid item md={showSidebar ? 8 : 12}>
          <ResultList />
        </Grid>
      </Grid>
    </>
  )
}
