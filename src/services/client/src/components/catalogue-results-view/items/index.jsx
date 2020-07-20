import React, { memo } from 'react'
import ResultItem from './item'
import { Grid, Typography } from '@material-ui/core'

export default memo(({ error, loading, results }) => {
  const waitMsg = error ? 'An error has occurred' : loading ? 'Loading' : null

  return (
    <Grid item xs={12}>
      {error || loading ? (
        <Typography style={{ margin: `10px 20px`, display: 'block' }} variant="overline" noWrap>
          {waitMsg}
        </Typography>
      ) : results.length ? (
        results.map(item => <ResultItem key={item.target._id} item={item} />)
      ) : (
        <Typography variant="overline">No results found</Typography>
      )}
    </Grid>
  )
})
