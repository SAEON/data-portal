import React from 'react'
import { Grid } from '@material-ui/core'
import Filters from './result-summary'
import Results from './results/index'

export default ({ subjects }) => {
  return (
    <Grid container spacing={0}>
      <Filters subjects={subjects} />
      <Results subjects={subjects} />
    </Grid>
  )
}
