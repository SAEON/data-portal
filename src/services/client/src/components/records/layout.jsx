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
  Link as ShareIcon,
  BarChart as PreviewIcon,
} from '@material-ui/icons'
import { debounce } from '../../lib/fns'
import { CLIENT_HOST_ADDRESS } from '../../config'
import QuickForm from '@saeon/quick-form'
import { isMobile } from 'react-device-detect'
import { useHistory } from 'react-router-dom'

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
  textSearch,
  setTextSearch,
  pageSize,
  Sidebar,
  ResultList,
  hideSidebar,
  disableSidebar,
}) => {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const [showSidebar, setShowSidebar] = useState(disableSidebar === true ? false : !hideSidebar)

  return (
    <>
      <AppBar
        color="inherit"
        position="sticky"
        style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        variant="outlined"
      >
        <Toolbar disableGutters variant="regular">
          {disableSidebar ? null : (
            <IconButton
              style={{ marginLeft: 5 }}
              onClick={() => setShowSidebar(!showSidebar)}
              color={showSidebar ? 'primary' : 'inherit'}
            >
              <FilterIcon />
            </IconButton>
          )}

          <QuickForm
            effects={[debounce(({ value }) => setTextSearch(value), 250)]}
            value={textSearch}
          >
            {({ updateForm, value }) => (
              <TextField
                style={{ minWidth: '40%', marginLeft: 5 }}
                autoComplete="off"
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

          {/* RESULT CONTEXT */}
          <div style={{ marginLeft: 'auto' }}>
            {isMobile ? null : (
              <Typography variant="overline" noWrap style={{ marginRight: 5 }}>
                {`${cursors.currentPage * pageSize + 1} - ${
                  catalogue?.records
                    ? Math.min(
                        cursors.currentPage * pageSize + pageSize,
                        catalogue.records.totalCount
                      )
                    : '..'
                } (${catalogue?.records ? catalogue.records.totalCount : '..'})`}
              </Typography>
            )}
          </div>

          {/* TOOLS */}
          <div style={{ marginLeft: 'auto' }}>
            {/* PREVIEW SELECTED DATASETS */}
            <Tooltip title="Preview selected datasets">
              <IconButton onClick={() => history.push('/atlas')}>
                {/* TODO pass state to atlas*/}
                <PreviewIcon />
              </IconButton>
            </Tooltip>

            {/* SHARE LINK */}
            <Tooltip title="Share result list">
              <Link
                // eslint-disable-next-line react/no-children-prop
                children=""
                component={forwardRef((props, ref) => (
                  <IconButton
                    ref={ref}
                    href={`${CLIENT_HOST_ADDRESS}/render/records${
                      window.location.search || '?terms='
                    }&disableSidebar=true`}
                    target="_blank"
                    rel="noreferrer"
                    {...props}
                  >
                    <ShareIcon />
                  </IconButton>
                ))}
              />
            </Tooltip>

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
          </div>
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
