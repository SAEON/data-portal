import React, { useState } from 'react'
import { Grid, AppBar, Toolbar, IconButton, Collapse, Fade } from '@material-ui/core'
import { CatalogueSearchField } from '../../../components'
import useStyles from './style'
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'

export default () => {
  const [collapsed, setCollapsed] = useState(false)
  const classes = useStyles()

  return (
    <AppBar position="relative" variant="outlined" style={{ border: 'none' }}>
      <Collapse key="collapse-header" collapsedSize="30px" in={!collapsed} timeout="auto">
        <Toolbar className={classes.toolbar}>
          <Grid container justify="center">
            <Grid item xs={12} sm={8}>
              <CatalogueSearchField classes={classes} />
            </Grid>
          </Grid>
        </Toolbar>
      </Collapse>

      <IconButton
        size="small"
        color="primary"
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute',
          bottom: -6,
          left: 'calc(50% - 15px)',
        }}
      >
        {collapsed ? (
          <Fade key="1" in={collapsed}>
            <ExpandMoreIcon fontSize="large" />
          </Fade>
        ) : (
          <Fade key="2" in={!collapsed}>
            <ExpandLessIcon fontSize="large" />
          </Fade>
        )}
      </IconButton>
    </AppBar>
  )
}
