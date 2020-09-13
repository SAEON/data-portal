import React from 'react'
import { Grid, Toolbar } from '@material-ui/core'
import { RecordsSearchBox } from '../../../components'
import useStyles from './style'

export default () => {
  const classes = useStyles()

  return (
    <div style={{ position: 'relative' }}>
      <Toolbar className={classes.toolbar}>
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} sm={8}>
            <RecordsSearchBox autofocus={true} />
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  )
}
