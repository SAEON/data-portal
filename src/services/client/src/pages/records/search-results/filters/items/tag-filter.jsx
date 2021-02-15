import { useState, useContext, useMemo } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Card from '@material-ui/core/Card'
import Fade from '@material-ui/core/Fade'
import Tooltip from '@material-ui/core/Tooltip'
import useTheme from '@material-ui/core/styles/useTheme'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { context as globalContext } from '../../../../../contexts/global'
import useStyles from './style'
import clsx from 'clsx'

const LIST_SIZE = 3

export default ({
  results,
  title,
  field,
  boost,
  sortBy = 'key',
  sortOrder = 'asc',
  style = {},
}) => {
  const [showAll, toggleShowAll] = useState(false)
  const { global, setGlobal } = useContext(globalContext)
  const { terms } = global
  const classes = useStyles()
  const theme = useTheme()

  const { sortedResults, currentContext } = useMemo(() => {
    const termValues = terms?.map(({ value }) => value) || []
    const currentContext = []

    const sortedResults = results
      ? [...results]
          .filter(({ key, doc_count }) => {
            if (termValues.includes(key.toString())) {
              currentContext.push({ key, doc_count })
              return false
            }
            return true
          })
          .sort(({ key: aKey, doc_count: aDocCount }, { key: bKey, doc_count: bDocCount }) => {
            let sort
            if (sortBy === 'key') {
              sort = aKey > bKey ? 1 : aKey === bKey ? 0 : -1
            } else {
              sort = aDocCount > bDocCount ? 1 : aDocCount === bDocCount ? 0 : -1
            }
            return sortOrder === 'asc' ? sort * 1 : sort * -1
          })
      : undefined

    return {
      sortedResults,
      currentContext,
    }
  }, [terms, results, sortBy, sortOrder])

  const [collapsed, setCollapsed] = useState(!currentContext.length)

  return (
    <>
      <AppBar style={style} className={clsx(classes.appbar)} position="relative" variant="outlined">
        <Toolbar className={clsx(classes.toolbar)} variant="regular">
          <Typography
            onClick={() => setCollapsed(!collapsed)}
            style={{ cursor: 'pointer' }}
            variant="overline"
            noWrap
          >
            {title}
          </Typography>

          <div style={{ marginLeft: 'auto' }}>
            {/* Icon */}
            <IconButton
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Collapse filter"
              color="inherit"
              size="small"
            >
              {collapsed ? (
                <Fade key={1} timeout={750} in={collapsed}>
                  <ExpandMoreIcon />
                </Fade>
              ) : (
                <Fade key={2} timeout={750} in={!collapsed}>
                  <ExpandLessIcon />
                </Fade>
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Collapse style={{ width: '100%' }} key="result-list-collapse" in={!collapsed}>
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
                      <Tooltip title={key} placement="top">
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
            {currentContext.length ? (
              <Grid container item xs={12} spacing={0}>
                <Grid item xs>
                  {/* Add spacing between selected and unselected terms here */}
                  <div style={{ margin: 8 }} />
                </Grid>
              </Grid>
            ) : undefined}
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
                      <Tooltip title={key} placement="top">
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
      </Collapse>
    </>
  )
}
