import React from 'react'
import ResultItem from './item'
import { Grid } from '@material-ui/core'
import useStyles from '../../../../style'
import clsx from 'clsx'

export default ({ results }) => {
  const classes = useStyles()
  return (
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
        <div style={{ marginRight: 16 }}>
          {results.map(item => (
            <ResultItem key={item.target._id} doc={item.target._source.metadata_json} />
          ))}
        </div>
      </div>
    </Grid>
  )
}
