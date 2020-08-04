import React, { useState } from 'react'
import { Grid, AppBar, Toolbar, IconButton, Collapse, Fade } from '@material-ui/core'
import { RecordsSearchBox } from '../../../components'
import useStyles from './style'
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'

export default () => {
  const [collapsed, setCollapsed] = useState(false)
  const classes = useStyles()

  return (
    <AppBar position="relative" variant="outlined" style={{ border: 'none', zIndex: 800 }}>
      <Collapse key="collapse-header" collapsedHeight="30px" in={!collapsed} timeout="auto">
        <Toolbar className={classes.toolbar}>
          <Grid container justify="center">
            <Grid item xs={12} sm={8}>
              <RecordsSearchBox style={{ visibility: collapsed ? 'hidden' : 'visible' }} />
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
          bottom: 2,
          left: 'calc(50% - 15px)',
        }}
      >
        {collapsed ? (
          <Fade key="1" in={collapsed}>
            <ExpandMoreIcon fontSize="small" />
          </Fade>
        ) : (
          <Fade key="2" in={!collapsed}>
            <ExpandLessIcon fontSize="small" />
          </Fade>
        )}
      </IconButton>
    </AppBar>
  )
}
