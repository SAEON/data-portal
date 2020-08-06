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
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  BarChart as PreviewIcon,
} from '@material-ui/icons'
import { UriStateContext } from '../../../../modules/provider-uri-state'

/**
 * Selected previews are the record DOI
 * + the position of the item in the linkedResources array
 */
export default ({ title }) => {
  const history = useHistory()
  const { uriState, setUriState } = useContext(UriStateContext)
  let { preview = '' } = uriState
  preview = preview
    .split(',')
    .map(item => decodeURIComponent(item))
    .filter(_ => _)

  // eslint-disable-next-line no-extra-boolean-cast
  const [collapsed, setCollapsed] = useState(!Boolean(preview.length))
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
          {preview.map(id => {
            const added = preview.includes(id)

            return (
              <Grid key={id} item xs={12} style={{ paddingLeft: 10 }}>
                <FormControlLabel
                  label={
                    <Typography variant="overline">{`${id.split('~').join(' (')})`}</Typography>
                  }
                  control={
                    <Checkbox
                      style={{ alignSelf: 'baseline' }}
                      size="small"
                      color="primary"
                      checked={added}
                      onChange={() => {
                        setUriState({
                          preview: added
                            ? [...preview].filter(p => p !== id)
                            : [...new Set([...(preview || []), id])],
                        })
                      }}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  }
                />
              </Grid>
            )
          })}
          <Button
            style={{ marginTop: 10, marginLeft: 5, marginBottom: 10 }}
            disableElevation
            size="small"
            variant="text"
            startIcon={<PreviewIcon />}
            onClick={() => history.push('/atlas')} // TODO - state needs to be transferred as well
          >
            View on Atlas
          </Button>
        </Grid>
      </Collapse>
    </>
  )
}
