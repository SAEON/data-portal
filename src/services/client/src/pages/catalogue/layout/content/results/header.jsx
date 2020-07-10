import React from 'react'
import { Grid, AppBar, Toolbar, InputBase, Typography, Button } from '@material-ui/core'
import {
  Search as SearchIcon,
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon,
} from '@material-ui/icons'
import useStyles from '../../../style'

export default ({ catalogue, cursors, setCursors, PAGE_SIZE }) => {
  const classes = useStyles()
  return (
    <Grid item xs={12}>
      <AppBar color="primary" style={{ border: 'none' }} position="relative" variant="outlined">
        <Toolbar variant="dense">
          <Typography variant="overline" noWrap>
            {catalogue.records.totalCount} results found ( {cursors.currentPage * PAGE_SIZE + 1} to{' '}
            {Math.min(cursors.currentPage * PAGE_SIZE + PAGE_SIZE, catalogue.records.totalCount)})
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Filter results..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <div className={classes.grow} />
          <Button
            variant="text"
            style={{ marginRight: 5 }}
            disabled={cursors.currentPage < 1}
            size="small"
            startIcon={<NavigateBeforeIcon />}
            onClick={() => {
              setCursors({
                start: catalogue.records.pageInfo.startCursor,
                end: undefined,
                currentPage: cursors.currentPage - 1,
              })
            }}
            color="inherit"
          >
            Previous
          </Button>
          <Button
            variant="text"
            size="small"
            disabled={cursors.currentPage * PAGE_SIZE + PAGE_SIZE >= catalogue.records.totalCount}
            endIcon={<NavigateNextIcon />}
            onClick={() => {
              setCursors({
                start: undefined,
                end: catalogue.records.pageInfo.endCursor,
                currentPage: cursors.currentPage + 1,
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
