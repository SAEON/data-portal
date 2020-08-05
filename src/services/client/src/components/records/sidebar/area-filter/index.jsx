import React, { useState } from 'react'
import { Typography, Grid, AppBar, Toolbar, IconButton, Collapse, Fade } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@material-ui/icons'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap } from '../../../../lib/ol'
import ComingSoonDialogue from './coming-soon-dialogue'

export default ({ title }) => {
  const [collapsed, setCollapsed] = useState(true)
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
      <Collapse style={{ width: '100%' }} key="result-list-collapse" in={!collapsed}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <OlReact
              viewOptions={{
                center: [32, 5],
                zoom: 2.5,
              }}
              layers={[terrestrisBaseMap()]}
              style={{ height: '350px', position: 'relative' }}
            >
              {({ map }) => (
                <MapProxy map={map}>
                  {({ proxy }) => (
                    <ComingSoonDialogue
                      iconProps={{
                        size: 'medium',
                        color: 'secondary',
                        style: { position: 'absolute', top: 0, right: 0, zIndex: 1 },
                      }}
                    />
                  )}
                </MapProxy>
              )}
            </OlReact>
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}
