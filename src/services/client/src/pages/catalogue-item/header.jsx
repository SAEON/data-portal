import React from 'react'
import { GetApp as GetAppIcon, Code as CodeIcon } from '@material-ui/icons'
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Typography,
  Tooltip,
  Hidden,
  IconButton,
} from '@material-ui/core'
import { Link as SimpleLink, CitationDialog, DataDownloadButton } from '../../components'

export default ({ record, id, toggleCodeView, codeView }) => {
  return (
    <AppBar
      color="inherit"
      position="sticky"
      style={{ zIndex: 1101, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      variant="outlined"
    >
      <Toolbar variant="regular">
        <Grid container spacing={2} justify="flex-end">
          {/* PAGE TITLE */}
          <Grid item xs>
            <Typography variant="overline" component="h1">
              {`${record.identifier?.identifier || 'UNKNOWN DOI'}`}
            </Typography>
          </Grid>

          {/* JSON */}
          <Tooltip title="View raw metadata record (JSON)">
            <IconButton onClick={toggleCodeView} color={codeView ? 'primary' : 'default'}>
              <CodeIcon />
            </IconButton>
          </Tooltip>

          {/* CITATTION */}
          <Hidden xsDown>
            <Grid item>
              <CitationDialog
                size="small"
                variant="outlined"
                color="primary"
                style={{ minWidth: 120 }}
                json={record}
              />
            </Grid>

            {/* METADATA Download */}
            <Grid item>
              <SimpleLink
                uri={
                  'data:' + 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(record))
                }
                download={`metadata_${id}.json`}
              >
                <Tooltip title="Download this page in JSON format">
                  <Button
                    style={{ minWidth: 120 }}
                    size="small"
                    variant="outlined"
                    color="primary"
                    startIcon={<GetAppIcon />}
                    disableElevation
                  >
                    Metadata
                  </Button>
                </Tooltip>
              </SimpleLink>
            </Grid>
          </Hidden>

          {/* DATA DOWNLOAD */}
          <Grid item>
            <DataDownloadButton
              size="small"
              style={{ minWidth: 120 }}
              disableElevation
              variant="outlined"
              color="primary"
              immutableResource={record.immutableResource}
            >
              Data
            </DataDownloadButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
