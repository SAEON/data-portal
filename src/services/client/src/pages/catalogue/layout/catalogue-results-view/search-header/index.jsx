import React, { useState } from 'react'
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
} from '@material-ui/core'
import {
  Search as SearchIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  ArrowDropDown as ArrowDropDownIcon,
  FilterList as FilterIcon,
} from '@material-ui/icons'
import { debounce } from '../../../../../lib/fns'
import QuickForm from '@saeon/quick-form'

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
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [showFilters, setShowFilters] = useState(true)

  return (
    <>
      <AppBar color="inherit" style={{ border: 'none' }} position="relative" variant="outlined">
        <Toolbar variant="regular">
          <IconButton
            onClick={() => setShowFilters(!showFilters)}
            color={showFilters ? 'primary' : 'default'}
          >
            <FilterIcon />
          </IconButton>

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
          <Typography variant="overline" noWrap>
            <>
              {cursors.currentPage * pageSize + 1} to{' '}
              {catalogue?.records
                ? Math.min(cursors.currentPage * pageSize + pageSize, catalogue.records.totalCount)
                : '..'}{' '}
              of {catalogue?.records ? catalogue.records.totalCount : '..'} results
            </>
          </Typography>

          <div style={{ flexGrow: 1 }} />
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
        </Toolbar>
      </AppBar>

      <Grid container>
        <Collapse orientation="horizontal" in={showFilters}>
          <Grid item xs={4}>
            <Sidebar />
          </Grid>
        </Collapse>

        <Grid item xs>
          <ResultList />
        </Grid>
      </Grid>
    </>
  )
}
