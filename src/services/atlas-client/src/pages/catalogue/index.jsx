import React from 'react'
import {
  Grid,
  Fade,
  AppBar,
  Toolbar,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import useStyles from './style'
import clsx from 'clsx'

export default () => {
  const classes = useStyles()

  return (
    <Fade in={true}>
      <div
        style={{ position: 'relative' }}
        className={clsx({
          [classes.root]: true,
        })}
      >
        {/* Search header */}
        <AppBar position="relative" variant="outlined">
          <Toolbar className={classes.toolbar}>
            <Grid style={{ alignSelf: 'center' }} container item justify="center" xs={12}>
              <Grid style={{ width: '100%' }} item md={6}>
                <TextField
                  size="medium"
                  margin="normal"
                  color="primary"
                  className={classes.textField}
                  fullWidth
                  placeholder="Enter search terms"
                  label="Find items with these terms"
                  id="saeon-data-search"
                  variant="outlined"
                  autoFocus
                  InputProps={{
                    endAdornment: (
                      <InputAdornment style={{ padding: 0 }} position="end">
                        <IconButton aria-label="Search" size="medium">
                          <SearchIcon fontSize="large" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {/* Catalogue */}
        <div
          className={clsx({
            [classes.catalogueContainer]: true,
          })}
        >
          <Grid
            className={clsx({
              [classes.grid]: true,
              [classes.padding]: true,
            })}
            container
            spacing={2}
          >
            {/* Filters */}
            <Grid
              className={clsx({
                [classes.grid]: true,
              })}
              item
              xs={12}
              md={4}
            >
              <div
                className={clsx({
                  [classes.scrollContainer]: true,
                })}
              >
                <Paper
                  variant="outlined"
                  style={{ position: 'sticky', top: 0 }}
                  className={classes.paper}
                >
                  Refine search
                </Paper>
                <Paper
                  variant="outlined"
                  style={{ height: 1200, textAlign: 'left' }}
                  className={classes.paper}
                >
                  Filter 1<br />
                  Filter 2<br />
                  Filter 3<br />
                  Filter 4<br />
                  etc
                </Paper>
              </div>
            </Grid>

            {/* Results */}
            <Grid
              className={clsx({
                [classes.grid]: true,
              })}
              item
              xs={12}
              md={8}
            >
              <Grid
                container
                spacing={2} // TODO - needs to be around
                className={clsx({
                  [classes.grid]: true,
                })}
              >
                {/* Results header */}
                <Grid item xs={12}>
                  <Paper variant="outlined" className={classes.paper}>
                    Sorting, pagination, etc.
                  </Paper>
                </Grid>

                {/* Results items */}
                <Grid
                  className={clsx({
                    [classes.resultsGrid]: true,
                  })}
                  item
                  xs={12}
                >
                  <div
                    className={clsx({
                      [classes.scrollContainer]: true,
                    })}
                  >
                    <Paper
                      variant="outlined"
                      style={{ position: 'sticky', top: 0 }}
                      className={classes.paper}
                    >
                      Search results
                    </Paper>
                    <Paper
                      variant="outlined"
                      style={{ height: 1200, textAlign: 'left' }}
                      className={classes.paper}
                    >
                      Result 1<br />
                      Result 2<br />
                      Result 3<br />
                      Result 4<br />
                      etc
                    </Paper>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </Fade>
  )
}
