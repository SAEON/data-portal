import React from 'react'
import { Divider, Grid, Toolbar } from '@material-ui/core'
import { RecordsSearch } from '../../../components'
import useStyles from './style'

export default () => {
  const classes = useStyles()

  return (
    <div style={{ position: 'relative' }}>
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={1} justify="center">
          <Grid container item xs={12} sm={8}>
            <Grid style={{ display: 'flex' }} item>
              <img
                style={{
                  height: 56,
                }}
                src="/saeon-logo.png"
              />
            </Grid>
            <Grid style={{ display: 'flex' }} item>
              <Divider variant="middle" orientation="vertical" />
            </Grid>
            <Grid item style={{ flexGrow: 2 }}>
              <RecordsSearch autofocus={true} />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  )
}
