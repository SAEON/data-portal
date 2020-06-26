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

export default () => {
  const classes = useStyles()

  return (
    <Fade in={true}>
      <div className={classes.root}>
        <AppBar position="relative" variant="outlined">
          <Toolbar className={classes.toolbar}>
            <Grid style={{ alignSelf: 'center' }} container item justify="center" xs={12}>
              <Grid style={{ width: '100%' }} item md={6}>
                <TextField
                  size="medium"
                  margin="normal"
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
        <div style={{ margin: '25px 25px 0px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" style={{ height: 1200 }} className={classes.paper}>
                Search filters
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper variant="outlined" className={classes.paper}>
                    Sorting, pagination, etc.
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <div style={{}}>
                    <Paper style={{ height: 1200 }} variant="outlined" className={classes.paper}>
                      Search results
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
