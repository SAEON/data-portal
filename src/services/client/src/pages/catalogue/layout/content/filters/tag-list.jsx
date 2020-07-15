import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Grid, Checkbox, FormControlLabel, Button } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@material-ui/icons'
import LoadingErrorBlock from '../_loading-error'
import { useUriState } from '../../../../../lib/uri-state'

const LIST_SIZE = 5

export default ({ results, error, loading }) => {
  const [showAll, toggleShowAll] = useState(false)
  const { getState, pushState } = useUriState(useHistory())
  const { terms = [] } = getState()

  const sortedResults = results
    ? [...results].sort(a => (terms.includes(a.key) ? -1 : 1))
    : undefined

  return error || loading ? (
    <LoadingErrorBlock error={error} loading={loading} />
  ) : (
    <Grid container>
      {(showAll ? sortedResults : sortedResults.slice(0, LIST_SIZE)).map(({ key, doc_count }) => (
        <Grid key={key} item xs={12}>
          <FormControlLabel
            label={
              <Typography variant="overline">{`${
                typeof key === 'string' ? key.toUpperCase() : key
              } (${doc_count})`}</Typography>
            }
            control={
              <Checkbox
                style={{ alignSelf: 'baseline' }}
                size="small"
                color="primary"
                checked={terms.includes(key) ? true : false}
                onChange={() => {
                  if (terms.includes(key)) {
                    pushState({
                      terms: terms.filter(s => s !== key),
                    })
                  } else {
                    pushState({
                      terms: [...new Set([...terms, key])],
                    })
                  }
                }}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
          />
        </Grid>
      ))}
      {sortedResults.length < LIST_SIZE ? null : (
        <Grid item xs={12}>
          <Button
            style={{ marginTop: 10 }}
            disableElevation
            size="small"
            variant="text"
            startIcon={showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={() => toggleShowAll(!showAll)}
          >
            Show {showAll ? 'less' : 'more'}
          </Button>
        </Grid>
      )}
    </Grid>
  )
}
