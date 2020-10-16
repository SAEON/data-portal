import { useState } from 'react';
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
import { CitationDialog, DataDownloadButton } from '../../../components'
import { useHistory } from 'react-router-dom'
import { useApolloClient, gql } from '@apollo/client'

export default ({ toggleCodeView, codeView, linkedResources, doi, immutableResource, id }) => {
  const client = useApolloClient()
  const [loading, setLoading] = useState(false)
  const history = useHistory()

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
              {doi || 'UNKNOWN DOI'}
            </Typography>
          </Grid>

          <Hidden xsDown>
            {/* PREVIEW */}
            {loading ? (
              <Fade in={loading}>
                <CircularProgress thickness={2} size={18} style={{ margin: '15px 8px' }} />
              </Fade>
            ) : (
              <Tooltip title={hasLayers ? 'Preview dataset' : 'Unable to preview this dataset'}>
                <span>
                  <IconButton
                    disabled={!hasLayers}
                    color={'primary'}
                    onClick={async e => {
                      e.stopPropagation()
                      setLoading(true)
                      const { data } = await client.mutate({
                        mutation: gql`
                          mutation($state: JSON!) {
                            browserClient {
                              persistSearchState(state: $state)
                            }
                          }
                        `,
                        variables: {
                          state: { selectedDois: [doi] },
                        },
                      })
                      if (data) {
                        history.push({
                          pathname: '/atlas',
                          search: `?search=${data.browserClient.persistSearchState}`,
                        })
                      } else {
                        throw new Error('Error creating atlas')
                      }
                    }}
                  >
                    <PreviewIcon />
                  </IconButton>
                </span>
              </Tooltip>
            )}

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
            <CitationDialog doi={doi} id={id}>
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
          <DataDownloadButton color="primary" immutableResource={immutableResource} />
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
