import React from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Chip, Grid } from '@material-ui/core'
import LoadingErrorBlock from '../_loading-error'
import { useUriState } from '../../../../../lib/uri-state'

export default ({ results, error, loading }) => {
  const { getState, pushState } = useUriState(useHistory())
  const { terms } = getState()

  return error || loading ? (
    <LoadingErrorBlock error={error} loading={loading} />
  ) : (
    <Grid container justify="space-between">
      {results.map(({ key, doc_count }) => (
        <Grid style={{ flexBasis: 300, flexGrow: 0 }} key={key} item>
          <Chip
            onDelete={
              terms.includes(key)
                ? () => {
                    if (terms.includes(key)) {
                      pushState({
                        terms: terms.filter(s => s !== key),
                      })
                    }
                  }
                : null
            }
            color={terms.includes(key) ? 'secondary' : 'default'}
            style={{ margin: '5px 5px 5px 0px' }}
            clickable
            variant={terms.includes(key) ? 'default' : 'outlined'}
            onClick={() => {
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
            size="small"
            label={
              <Typography variant="overline">{`${
                typeof key === 'string' ? key.toUpperCase().truncate(40) : key
              } (${doc_count})`}</Typography>
            }
          />
        </Grid>
      ))}
    </Grid>
  )
}
