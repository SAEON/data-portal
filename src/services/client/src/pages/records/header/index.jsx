import React from 'react'
import { Divider, Grid, Toolbar } from '@material-ui/core'
import { RecordsSearch } from '../../../components'
import useStyles from './style'
import { isMobile } from 'react-device-detect'
import { CLIENT_HOST_ADDRESS } from '../../../config'

export default () => {
  const classes = useStyles()

  return (
    <div style={{ position: 'relative' }}>
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={1} justify="center">
          <Grid container item xs={12} sm={8} direction={isMobile ? 'column' : 'row'}>
            <Grid style={{ display: 'flex' }} item>
              <a style={{ display: 'block', margin: 'auto' }} href={CLIENT_HOST_ADDRESS}>
                <img
                  style={{
                    height: 56,
                  }}
                  src="/saeon-logo.png"
                />
              </a>
            </Grid>
            <Grid style={{ display: 'flex' }} item>
              {isMobile ? undefined : <Divider variant="middle" orientation="vertical" />}
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
