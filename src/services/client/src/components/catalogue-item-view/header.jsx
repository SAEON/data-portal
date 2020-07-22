import React, { forwardRef } from 'react'
import {
  GetApp as GetAppIcon,
  Code as CodeIcon,
  Share as ShareIcon,
  Link,
} from '@material-ui/icons'
import { AppBar, Toolbar, Button, Grid, Typography, Tooltip, Hidden } from '@material-ui/core'
import { Link as SimpleLink, CitationDialog, DataDownloadButton } from '..'
import { CLIENT_HOST_ADDRESS } from '../../config'

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
          <Grid item xs style={{ alignSelf: 'center' }}>
            <Typography variant="overline" component="h1">
              {`${record.identifier?.identifier || 'UNKNOWN DOI'}`}
            </Typography>
          </Grid>

          <Hidden xsDown>
            {/* JSON */}
            <Grid item>
              <Tooltip title="View raw metadata record (JSON)">
                <Button
                  style={{ minWidth: 120 }}
                  variant="outlined"
                  color={codeView ? 'secondary' : 'primary'}
                  startIcon={<CodeIcon />}
                  disableElevation
                  onClick={toggleCodeView}
                >
                  Metadata
                </Button>
              </Tooltip>
            </Grid>

            {/* SHARE */}
            <Grid item>
              <Tooltip title="Share a link to this record">
                <Link
                  component={forwardRef((props, ref) => (
                    <Button
                      style={{ minWidth: 120 }}
                      variant="outlined"
                      color="primary"
                      startIcon={<ShareIcon />}
                      disableElevation
                      ref={ref}
                      href={`${CLIENT_HOST_ADDRESS}/render/catalogue-item-view?id=${id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Share
                    </Button>
                  ))}
                />
              </Tooltip>
            </Grid>

            {/* CITATTION */}
            <Grid item>
              <CitationDialog
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
