import React from 'react'
import { Divider, Grid, Toolbar } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { RecordsSearch } from '../../../components'
import useStyles from './style'
import { isMobile } from 'react-device-detect'
import { CLIENT_HOST_ADDRESS } from '../../../config'

export default () => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div style={{ position: 'relative' }}>
      <Toolbar style={{ padding: 8 }} className={classes.toolbar}>
        <Grid container spacing={0} justify="center">
          <Grid container item xs={12} sm={8} direction={isMobile ? 'column' : 'row'}>
            <Grid style={{ display: 'flex' }} item>
              <a style={{ display: 'block', margin: 'auto' }} href={CLIENT_HOST_ADDRESS}>
                <img
                  style={{
                    height: 80,
                  }}
                  src="/saeon-logo-white.png"
                />
              </a>
            </Grid>
            <Grid style={{ display: 'flex' }} item>
              {isMobile ? undefined : (
                <Divider className={classes.divider} variant="middle" orientation="vertical" />
              )}
            </Grid>
            <Grid item style={{ flexGrow: 2 }}>
              <RecordsSearch
                className={classes.recordSearchBox}
                color={'secondary'}
                inputProps={{
                  className: classes.input,
                }}
                iconProps={{ style: { color: theme.palette.common.white } }}
                autofocus={true}
              />
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  )
}
