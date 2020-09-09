import React, { useState, useContext, useEffect } from 'react'
import { Grid, Toolbar, IconButton, Collapse, Chip } from '@material-ui/core'
import { RecordsSearchBox } from '../../../components'
import { debounce } from '../../../lib/fns'
import useStyles from './style'
import { GlobalContext } from '../../../modules/provider-global'
import { MoreHoriz } from '@material-ui/icons'

const TIMEOUT = 500

export default () => {
  const classes = useStyles()
  const { global, setGlobal } = useContext(GlobalContext)
  const { terms } = global
  const [collapsed, setCollapsed] = useState(!terms.length)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (terms.length === 0) setCollapsed(true)
    else setCollapsed(false)
  }, [terms])

  return (
    <div style={{ position: 'relative' }}>
      <Collapse
        key="collapse-header"
        collapsedHeight="30px"
        in={!collapsed || hovered}
        timeout={TIMEOUT}
      >
        <Toolbar
          onMouseEnter={debounce(() => {
            if (!collapsed) {
              setCollapsed(true)
            }
            if (!hovered) {
              setHovered(true)
            }
          })}
          onMouseLeave={() => setHovered(false)}
          className={classes.toolbar}
        >
          <Grid style={{ marginBottom: 48, marginTop: 48 }} container spacing={1} justify="center">
            <Grid item xs={12} sm={8}>
              <RecordsSearchBox autofocus={false} onFocus={() => setCollapsed(false)} />
            </Grid>
            <Grid
              style={{ minHeight: 40 }}
              container
              item
              spacing={1}
              justify="flex-start"
              xs={12}
              sm={8}
            >
              {[...new Set(terms.map(({ value }) => value))].map(term => (
                <Grid item key={term}>
                  <Chip
                    color="primary"
                    onDelete={() =>
                      setGlobal({
                        terms: terms.filter(({ value }) => value !== term),
                      })
                    }
                    size="small"
                    label={term.toUpperCase()}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Toolbar>
      </Collapse>
      <IconButton
        size="small"
        tabIndex={999}
        style={{
          position: 'absolute',
          bottom: 2,
          left: 'calc(50% - 15px)',
          pointerEvents: 'none',
        }}
      >
        <MoreHoriz fontSize="small" />
      </IconButton>
    </div>
  )
}
