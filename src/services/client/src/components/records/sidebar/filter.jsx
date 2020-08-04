import React, { useState, useContext } from 'react'
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
  Fade,
} from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@material-ui/icons'
import { UriStateContext } from '../../../modules/provider-uri-state'

const LIST_SIZE = 3

export default ({ results, title }) => {
  const { uriState, setUriState } = useContext(UriStateContext)
  const [showAll, toggleShowAll] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  let { terms = '' } = uriState
  terms = terms
    .split(',')
    .map(item => decodeURIComponent(item))
    .filter(_ => _)

  const sortedResults = results
    ? [...results].sort(a => (terms.includes(a.key) ? -1 : 1))
    : undefined

  return (
    <>
      <AppBar
        color="default"
        position="relative"
        variant="outlined"
        style={{ zIndex: 800, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar variant="dense">
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
      <Collapse key="result-list-collapse" in={!collapsed}>
        <Grid container spacing={0}>
          {(showAll ? sortedResults : sortedResults.slice(0, LIST_SIZE)).map(
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
                        checked={terms.includes(key) ? true : false}
                        onChange={() => {
                          if (terms.includes(key)) {
                            setUriState({
                              terms: terms.filter(s => s !== key),
                            })
                          } else {
                            setUriState({
                              terms: [...new Set([...terms, key])],
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
          {sortedResults.length < LIST_SIZE ? null : (
            <Button
              style={{ marginTop: 10, marginLeft: 5 }}
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
      </Collapse>
    </>
  )
}
