import React, { useContext } from 'react'
import { GetApp as GetAppIcon, Code as CodeIcon, BarChart as PreviewIcon } from '@material-ui/icons'
import { AppBar, Toolbar, Button, Grid, Typography, Tooltip, Hidden } from '@material-ui/core'
import { Link as SimpleLink, CitationDialog, DataDownloadButton } from '..'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../../modules/provider-global'

export default ({ record, id, toggleCodeView, codeView }) => {
  const history = useHistory()
  const { setGlobal } = useContext(GlobalContext)
  const { identifier, linkedResources } = record
  const DOI =
    identifier && identifier.identifierType.toUpperCase() === 'DOI'
      ? identifier.identifier
      : undefined

  const mapLayers = DOI
    ? [
        ...new Set(
          linkedResources
            ?.filter(({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY')
            ?.map(() => DOI)
        ),
      ]
    : undefined

  return (
    <AppBar
      color="inherit"
      position="sticky"
      style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      variant="outlined"
    >
      <Toolbar variant="dense">
        <Grid container spacing={2} justify="flex-end">
          {/* PAGE TITLE */}
          <Grid item xs style={{ alignSelf: 'center' }}>
            <Typography variant="overline" component="h1">
              {DOI || 'UNKNOWN DOI'}
            </Typography>
          </Grid>

          <Hidden xsDown>
            {/* PREVIEW */}
            <Grid item>
              <Tooltip title={DOI ? 'Preview dataset' : 'Unable to preview this dataset'}>
                <span>
                  <Button
                    disabled={!DOI}
                    style={{ minWidth: 120 }}
                    variant="outlined"
                    color={'primary'}
                    startIcon={<PreviewIcon />}
                    disableElevation
                    onClick={e => {
                      e.stopPropagation()
                      setGlobal({
                        layers: mapLayers,
                      })
                      history.push('/atlas')
                    }}
                  >
                    PREVIEW
                  </Button>
                </span>
              </Tooltip>
            </Grid>

            {/* JSON */}
            <Grid item>
              <Tooltip title="View raw metadata record (JSON)">
                <Button
                  style={{ minWidth: 120 }}
                  variant="outlined"
                  color={codeView ? 'secondary' : 'primary'}
                  startIcon={<CodeIcon />}
                  disableElevation
                  onClick={e => {
                    e.stopPropagation()
                    toggleCodeView()
                  }}
                >
                  JSON
                </Button>
              </Tooltip>
            </Grid>

            {/* CITATTION */}
            <Grid item>
              <CitationDialog
                variant="outlined"
                color="primary"
                style={{ minWidth: 120 }}
                record={record}
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
