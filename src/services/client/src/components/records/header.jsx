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
} from '@material-ui/core'
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  ArrowDropDown as ArrowDropDownIcon,
  FilterList as FilterIcon,
  Map as MapIcon,
  Explore as PreviewIcon,
} from '@material-ui/icons'
import { isMobile } from 'react-device-detect'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../../modules/provider-global'

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
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const { global, setGlobal } = useContext(GlobalContext)
  const { layers } = global

  const resultsWithDOIs =
    catalogue?.summary
      .find(obj => Object.entries(obj).find(([k]) => k === 'identifier.identifierType.raw'))
      ['identifier.identifierType.raw'].find(({ key }) => key === 'DOI')?.doc_count || 0

  return (
    <>
      <AppBar
        color="inherit"
        position="sticky"
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        }}
        variant="outlined"
      >
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
            <Grid item xs={5} sm={4} container justify="center" alignContent="center">
              {isMobile ? null : (
                <Typography component="div" variant="overline" noWrap style={{ display: 'flex' }}>
                  {catalogue?.records ? `${catalogue.records.totalCount}` : '...'} Records
                </Typography>
              )}
            </Grid>

            {/* TOOLS */}
            <Grid item xs={6} sm={4} container justify="flex-end" alignItems="center">
              {/* PREVIEW ALL DATASETS */}
              <Tooltip title={`Explore all ${resultsWithDOIs} (mappable) results`}>
                <span>
                  <IconButton
                    style={{ marginRight: 10 }}
                    disabled={!resultsWithDOIs}
                    onClick={() => {
                      setGlobal({ layersearch: true })
                      history.push('/atlas')
                    }}
                  >
                    <Badge
                      color={resultsWithDOIs ? 'primary' : 'default'}
                      badgeContent={resultsWithDOIs}
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      invisible={false}
                    >
                      <MapIcon />
                    </Badge>
                  </IconButton>
                </span>
              </Tooltip>

              {/* EXPLORE SELECTED DATASETS */}
              <Tooltip title={`Explore ${layers?.length} selected datasets`}>
                <span>
                  <IconButton
                    disabled={!layers?.length}
                    style={{ marginRight: 10 }}
                    onClick={() =>
                      history.push({
                        pathname: '/atlas',
                      })
                    }
                  >
                    <Badge
                      color={layers?.length ? 'primary' : 'default'}
                      badgeContent={layers?.length || 0}
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      invisible={false}
                    >
                      <PreviewIcon />
                    </Badge>
                  </IconButton>
                </span>
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
