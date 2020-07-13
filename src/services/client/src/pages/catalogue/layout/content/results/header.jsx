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
} from '@material-ui/core'
import {
  Search as SearchIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons'
import useStyles from '../../../style'

const pageSizes = [10, 20, 50, 100, 200]

export default ({ catalogue, setPageSize, loading, error, cursors, setCursors, pageSize }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)

  return (
    <Grid item xs={12}>
      <AppBar color="primary" style={{ border: 'none' }} position="relative" variant="outlined">
        <Toolbar variant="regular">
          <Typography variant="overline" noWrap>
            {loading || error ? null : (
              <>
                {cursors.currentPage * pageSize + 1} to{' '}
                {Math.min(cursors.currentPage * pageSize + pageSize, catalogue.records.totalCount)}{' '}
                of {catalogue.records.totalCount} results
              </>
            )}
          </Typography>
          {loading || error ? null : (
            <div className={classes.searchBar}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item style={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    size="small"
                    color="secondary"
                    placeholder="Filter current results..."
                    variant="outlined"
                    InputProps={{
                      style: { color: 'white' },
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          )}

          <div className={classes.grow} />
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
              <MenuItem
                key={x}
                onClick={() => {
                  setPageSize(x)
                  setAnchorEl(null)
                }}
              >
                {x}
              </MenuItem>
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
    </Grid>
  )
}
