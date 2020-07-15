import React, { memo } from 'react'
import ResultItem from './item'
import { Grid, Typography } from '@material-ui/core'
import useStyles from '../../../../style'
import clsx from 'clsx'
import LoadingErrorBlock from '../../_loading-error'

export default memo(({ error, loading, results }) => {
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
          {loading || error ? (
            <LoadingErrorBlock error={error} loading={'Loading'} />
          ) : results.length ? (
            results.map(item => <ResultItem key={item.target._id} item={item} />)
          ) : (
            <Typography variant="overline">No results found</Typography>
          )}
        </div>
      </div>
    </Grid>
  )
})
