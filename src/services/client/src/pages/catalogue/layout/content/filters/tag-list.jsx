import React from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, Chip, Grid } from '@material-ui/core'
import LoadingErrorBlock from '../_loading-error'

const getSearchState = () =>
  decodeURIComponent(window.location.search.replace('?terms=', ''))
    .split(',')
    .filter(_ => _)

export default ({ results, error, loading }) => {
  const history = useHistory()

  return error || loading ? (
    <LoadingErrorBlock error={error} loading={loading} />
  ) : (
    <Grid container justify="space-between">
      {results.map(({ key, doc_count }) => (
        <Grid style={{ flexBasis: 300, flexGrow: 0 }} key={key} item>
          <Chip
            onDelete={
              getSearchState().includes(key)
                ? () => {
                    const activeSubjects = getSearchState()
                    if (activeSubjects.includes(key)) {
                      activeSubjects.splice(activeSubjects.indexOf(key), 1)
                      history.push({
                        pathname: window.location.pathname,
                        search: `?terms=${encodeURIComponent(activeSubjects.join(','))}`,
                      })
                    }
                  }
                : null
            }
            color={getSearchState().includes(key) ? 'secondary' : 'default'}
            style={{ margin: '5px 5px 5px 0px' }}
            clickable
            variant={getSearchState().includes(key) ? 'default' : 'outlined'}
            onClick={() => {
              const activeSubjects = getSearchState()
              if (activeSubjects.includes(key)) {
                activeSubjects.splice(activeSubjects.indexOf(key), 1)
                history.push({
                  pathname: window.location.pathname,
                  search: `?terms=${encodeURIComponent(activeSubjects.join(','))}`,
                })
              } else {
                history.push({
                  pathname: window.location.pathname,
                  search: `?terms=${encodeURIComponent(
                    [...new Set([...getSearchState(), key])].join(',')
                  )}`,
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
