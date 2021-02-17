import { useState, useContext, useMemo } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import Card from '@material-ui/core/Card'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { context as globalContext } from '../../../../../../contexts/global'
import useTheme from '@material-ui/core/styles/useTheme'

const LIST_SIZE = 3

export default ({ filteredResults, currentContext, field, boost, sortBy, sortOrder, terms }) => {
  const [showAll, toggleShowAll] = useState(false)
  const { setGlobal } = useContext(globalContext)
  const theme = useTheme()

  const sortedResults = useMemo(() => {
    return filteredResults
      ? [...filteredResults].sort(
          ({ key: aKey, doc_count: aDocCount }, { key: bKey, doc_count: bDocCount }) => {
            let sort
            if (sortBy === 'key') {
              sort = aKey > bKey ? 1 : aKey === bKey ? 0 : -1
            } else {
              sort = aDocCount > bDocCount ? 1 : aDocCount === bDocCount ? 0 : -1
            }
            return sortOrder === 'asc' ? sort * 1 : sort * -1
          }
        )
      : undefined
  }, [filteredResults, sortBy, sortOrder])

  return (
    <Card variant="outlined">
      <Grid container item xs={12} spacing={0}>
        {/* SELECTED FILTERS */}
        {currentContext
          .sort(({ key: a }, { key: b }) => (a > b ? -1 : b > a ? 1 : 0))
          .map(({ key }) => {
            key = typeof key === 'number' ? `${key}` : key
            return (
              <Grid key={key} item xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    style={{ alignSelf: 'baseline' }}
                    size="small"
                    color="primary"
                    checked={terms?.map(({ value }) => value)?.includes(key) ? true : false}
                    onChange={() => {
                      if (terms?.map(({ value }) => value)?.includes(key)) {
                        setGlobal({
                          terms: terms?.filter(({ value }) => value !== key),
                        })
                      } else {
                        setGlobal({
                          terms: [...new Set([...terms, { field, boost, value: key }])],
                        })
                      }
                    }}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <Tooltip title={key?.toUpperCase()} placement="top">
                    <Typography
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginRight: theme.spacing(2),
                      }}
                      variant="overline"
                    >{`${typeof key === 'string' ? key.toUpperCase() : key}`}</Typography>
                  </Tooltip>
                </div>
              </Grid>
            )
          })}

        {/* Add spacing between selected and unselected terms here */}
        {currentContext.length ? (
          <Grid container item xs={12} spacing={0}>
            <Grid item xs>
              <div style={{ margin: 8 }} />
            </Grid>
          </Grid>
        ) : undefined}

        {/* Filter controls */}
        {(showAll ? sortedResults : sortedResults?.slice(0, LIST_SIZE))?.map(
          ({ key, doc_count }) => {
            key = typeof key === 'number' ? `${key}` : key
            return (
              <Grid key={key} item xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Checkbox
                    style={{ alignSelf: 'baseline', display: 'flex' }}
                    size="small"
                    color="primary"
                    checked={terms?.map(({ value }) => value)?.includes(key) ? true : false}
                    onChange={() => {
                      if (terms?.map(({ value }) => value)?.includes(key)) {
                        setGlobal({
                          terms: terms?.filter(({ value }) => value !== key),
                        })
                      } else {
                        setGlobal({
                          terms: [...new Set([...terms, { field, boost, value: key }])],
                        })
                      }
                    }}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <Tooltip title={key?.toUpperCase()} placement="top">
                    <Typography
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginRight: theme.spacing(2),
                      }}
                      variant="overline"
                    >{`${
                      typeof key === 'string' ? key.toUpperCase() : key
                    } (${doc_count})`}</Typography>
                  </Tooltip>
                </div>
              </Grid>
            )
          }
        )}

        {/* Show more */}
        {sortedResults?.length <= LIST_SIZE ? null : (
          <Button
            style={{ marginTop: 10, marginLeft: 5, marginBottom: 10 }}
            disableElevation
            size="small"
            variant="text"
            startIcon={showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={() => toggleShowAll(!showAll)}
          >
            Show {showAll ? 'less' : 'more'}
          </Button>
        )}
      </Grid>
    </Card>
  )
}
