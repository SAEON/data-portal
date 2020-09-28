import React, { useState, useContext, useMemo } from 'react'
import {
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Collapse,
  Card,
  Fade,
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@material-ui/icons'
import { GlobalContext } from '../../../../modules/provider-global'
import useStyles from './style'
import clsx from 'clsx'

const LIST_SIZE = 3

export default ({ results, title, field, sortBy = 'key', sortOrder = 'asc' }) => {
  const [showAll, toggleShowAll] = useState(false)
  const { global, setGlobal } = useContext(GlobalContext)
  const { terms } = global
  const classes = useStyles()

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
      <AppBar
        className={clsx(classes.appbar)}
        position="relative"
        variant="outlined"
        style={{ zIndex: 800, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar className={clsx(classes.toolbar)} variant="regular">
          <Typography variant="overline" noWrap>
            {title}
          </Typography>

          <div style={{ marginLeft: 'auto' }}>
            {/* Icon */}
            <IconButton
              aria-label="Collapse filter"
              onClick={() => setCollapsed(!collapsed)}
              color="inherit"
              size="small"
            >
              {collapsed ? (
                <Fade key={1} in={collapsed}>
                  <ExpandMoreIcon />
                </Fade>
              ) : (
                <Fade key={2} in={!collapsed}>
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
            {currentContext
              .sort(({ key: a }, { key: b }) => (a > b ? -1 : b > a ? 1 : 0))
              .map(({ key }) => {
                key = typeof key === 'number' ? `${key}` : key
                return (
                  <Grid key={key} item xs={12} style={{ paddingLeft: 10 }}>
                    <FormControlLabel
                      label={
                        <Typography variant="overline">{`${
                          typeof key === 'string' ? key.toUpperCase() : key
                        }`}</Typography>
                      }
                      control={
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
                                terms: [...new Set([...terms, { field, value: key }])],
                              })
                            }
                          }}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      }
                    />
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
                  <Grid key={key} item xs={12} style={{ paddingLeft: 10 }}>
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
                          checked={terms?.map(({ value }) => value)?.includes(key) ? true : false}
                          onChange={() => {
                            if (terms?.map(({ value }) => value)?.includes(key)) {
                              setGlobal({
                                terms: terms?.filter(({ value }) => value !== key),
                              })
                            } else {
                              setGlobal({
                                terms: [...new Set([...terms, { field, value: key }])],
                              })
                            }
                          }}
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      }
                    />
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
