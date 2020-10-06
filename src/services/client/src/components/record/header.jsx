import React, { useContext } from 'react'
import {
  FormatQuote as CitationIcon,
  Code as CodeIcon,
  BarChart as PreviewIcon,
} from '@material-ui/icons'
import { AppBar, Toolbar, Grid, Typography, Tooltip, Hidden, IconButton } from '@material-ui/core'
import { CitationDialog, DataDownloadButton } from '..'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from '../../modules/provider-global'

export default ({ record, toggleCodeView, codeView }) => {
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
    <AppBar color="inherit" position="sticky" variant="outlined">
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
            <Tooltip title={DOI ? 'Preview dataset' : 'Unable to preview this dataset'}>
              <span>
                <IconButton
                  disabled={!DOI}
                  color={'primary'}
                  onClick={e => {
                    e.stopPropagation()
                    setGlobal({
                      layers: mapLayers,
                    })
                    history.push('/atlas')
                  }}
                >
                  <PreviewIcon />
                </IconButton>
              </span>
            </Tooltip>

            {/* JSON */}
            <Tooltip title="View raw metadata record (JSON)">
              <IconButton
                color={codeView ? 'primary' : 'default'}
                onClick={e => {
                  e.stopPropagation()
                  toggleCodeView()
                }}
              >
                <CodeIcon />
              </IconButton>
            </Tooltip>

            {/* CITATTION */}
            <CitationDialog record={record}>
              {({ disabled, onClick }) => (
                <Tooltip placement="left-start" title="Cite this record">
                  <span>
                    <IconButton color="primary" disabled={disabled} onClick={onClick}>
                      <CitationIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              )}
            </CitationDialog>
          </Hidden>

          {/* DATA DOWNLOAD */}
          <DataDownloadButton color="primary" immutableResource={record.immutableResource} />
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
