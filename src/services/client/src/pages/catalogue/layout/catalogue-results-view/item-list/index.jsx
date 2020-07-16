import React, { memo } from 'react'
import ResultItem from './item'
import { Grid, Typography } from '@material-ui/core'

export default memo(({ error, loading, results }) => {
  return (
    <Grid item xs={12}>
      {error ? (
        <Typography variant="overline" noWrap>
          <div>An error has occurred</div>
        </Typography>
      ) : loading ? (
        <Typography variant="overline" noWrap>
          <div>Loading</div>
        </Typography>
      ) : results.length ? (
        results.map(item => <ResultItem key={item.target._id} item={item} />)
      ) : (
        <Typography variant="overline">No results found</Typography>
      )}
    </Grid>
  )
})
