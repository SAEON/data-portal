import React, { memo } from 'react'
import ResultItem from './item'
import { Grid, Typography } from '@material-ui/core'
import LoadingErrorBlock from '../../_loading-error'

export default memo(({ error, loading, results }) => {
  return (
    <Grid item xs={12}>
      {loading || error ? (
        <LoadingErrorBlock error={error} loading={'Loading'} />
      ) : results.length ? (
        results.map(item => <ResultItem key={item.target._id} item={item} />)
      ) : (
        <Typography variant="overline">No results found</Typography>
      )}
    </Grid>
  )
})
