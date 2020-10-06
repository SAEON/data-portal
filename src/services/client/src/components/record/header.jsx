import React from 'react'
import {
  FormatQuote as CitationIcon,
  Code as CodeIcon,
  BarChart as PreviewIcon,
} from '@material-ui/icons'
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Tooltip,
  Hidden,
  IconButton,
  Fade,
  CircularProgress,
} from '@material-ui/core'
import { CitationDialog, DataDownloadButton } from '..'
import { useHistory } from 'react-router-dom'
import { usePersistSearch as WithPersistSearch } from '../../hooks'

export default ({ record, toggleCodeView, codeView }) => {
  const history = useHistory()
  const { identifier, linkedResources } = record
  const DOI =
    identifier && identifier.identifierType.toUpperCase() === 'DOI'
      ? identifier.identifier
      : undefined

  const hasLayers = Boolean(
    linkedResources?.find(({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY')
  )

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
            <Tooltip title={hasLayers ? 'Preview dataset' : 'Unable to preview this dataset'}>
              <span>
                <WithPersistSearch>
                  {([persistSearchState, { loading, error, data }]) => {
                    if (error) {
                      throw new Error('Error persiting search state', error)
                    }

                    if (data) {
                      const searchId = data.browserClient.persistSearchState
                      history.push({
                        pathname: '/atlas',
                        search: `?search=${searchId}`,
                      })
                    }

                    if (loading || data) {
                      return (
                        <Fade in={true}>
                          <CircularProgress thickness={2} size={12} style={{ margin: '0 6px' }} />
                        </Fade>
                      )
                    }

                    return (
                      <IconButton
                        disabled={!hasLayers}
                        color={'primary'}
                        onClick={e => {
                          e.stopPropagation()
                          persistSearchState({
                            variables: {
                              state: { selectedDois: [DOI] },
                            },
                          })
                        }}
                      >
                        <PreviewIcon />
                      </IconButton>
                    )
                  }}
                </WithPersistSearch>
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
