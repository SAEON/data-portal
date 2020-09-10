import React, { useState, useContext } from 'react'
import {
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Collapse,
  Fade,
  FormControlLabel,
  Checkbox,
  Button,
  Tooltip,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Explore as PreviewIcon,
  Close as CloseIcon,
} from '@material-ui/icons'
import { GlobalContext } from '../../../../modules/provider-global'
import useStyles from './style'
import clsx from 'clsx'

/**
 * Selected previews are the record DOI
 * + the position of the item in the linkedResources array
 */
export default ({ title }) => {
  const history = useHistory()
  const [collapsed, setCollapsed] = useState(false)
  const { global, setGlobal } = useContext(GlobalContext)
  const { layers } = global
  const classes = useStyles()

  return (
    <>
      <AppBar
        className={clsx(classes.appbar)}
        position="relative"
        variant="outlined"
        style={{ zIndex: 800 }}
      >
        <Toolbar className={clsx(classes.toolbar)} variant="dense">
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
          {layers?.map(DOI => {
            const added = layers.includes(DOI)

            return (
              <Grid key={DOI} item xs={12} style={{ paddingLeft: 10 }}>
                <FormControlLabel
                  label={<Typography variant="overline">{DOI}</Typography>}
                  control={
                    <Checkbox
                      style={{ alignSelf: 'baseline' }}
                      size="small"
                      color="primary"
                      checked={added}
                      onChange={() => {
                        setGlobal({
                          layers: added
                            ? [...layers].filter(p => p !== DOI)
                            : [...new Set([...(layers || []), DOI])],
                        })
                      }}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  }
                />
              </Grid>
            )
          })}
          <Grid container justify="space-between" spacing={1} style={{ margin: 5 }}>
            <Grid item>
              <Tooltip placement="top-end" title={`Explore ${layers?.length} selected datasets`}>
                <span>
                  <Button
                    disabled={!layers?.length}
                    disableElevation
                    size="small"
                    variant="text"
                    startIcon={<PreviewIcon />}
                    onClick={() =>
                      history.push({
                        pathname: '/atlas',
                        search: `layers=${layers}`,
                      })
                    }
                  >
                    View on Atlas
                  </Button>
                </span>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip placement="top-end" title={`Deselect ${layers?.length} selected datasets`}>
                <span>
                  <Button
                    disabled={!layers?.length}
                    disableElevation
                    size="small"
                    variant="text"
                    startIcon={<CloseIcon />}
                    onClick={() => setGlobal({ layers: [] })}
                  >
                    Clear
                  </Button>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}
