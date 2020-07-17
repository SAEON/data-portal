import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
import { useUriState } from '../../../modules/uri-state'

const LIST_SIZE = 3

export default ({ results, title }) => {
  const [showAll, toggleShowAll] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const { getState, pushState } = useUriState(useHistory())
  const { terms = [] } = getState()

  const sortedResults = results
    ? [...results].sort(a => (terms.includes(a.key) ? -1 : 1))
    : undefined

  return (
    <>
      <AppBar color="secondary" position="relative" variant="outlined">
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
                <span>
                  <Fade in={collapsed}>
                    <ExpandMoreIcon />
                  </Fade>
                </span>
              ) : (
                <Fade in={!collapsed}>
                  <ExpandLessIcon />
                </Fade>
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Collapse in={!collapsed}>
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
