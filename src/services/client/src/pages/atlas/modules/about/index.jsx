import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import FeaturesTable from './_feature-table'
import packageJson from '../../../../../package.json'

export default () => (
  <>
    <Grid container style={{ height: '100%' }}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant="overline">Work status</Typography>
      </Grid>
      <Grid item xs={12} style={{ height: '90%', padding: '10px 0' }}>
        <FeaturesTable />
      </Grid>
    </Grid>
    <Grid style={{ position: 'absolute', left: 0, bottom: 0 }} container justify="center">
      <Grid item>
        <Typography variant="overline">v{packageJson.version} | &copy; SAEON 2020</Typography>
      </Grid>
    </Grid>
  </>
)
