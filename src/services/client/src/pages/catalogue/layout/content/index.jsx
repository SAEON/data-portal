import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from '../../style'
import clsx from 'clsx'
import Filters from './result-summary'
import Results from './results/index'

export default ({ subjects }) => {
  const classes = useStyles()

  return (
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
        <Filters subjects={subjects} />
        <Results subjects={subjects} />
      </Grid>
    </div>
  )
}
