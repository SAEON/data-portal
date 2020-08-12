import React, { useState, memo } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  IconButton,
  Fade,
  Tooltip,
  Collapse,
} from '@material-ui/core'
import {
  Visibility as ViewIcon,
  BarChart as PreviewIcon,
  Code as CodeIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons'
import QuickForm from '@saeon/quick-form'
import { Link, CitationDialog, DataDownloadButton } from '../..'
import { isMobile } from 'react-device-detect'

export default memo(
  ({
    DOI,
    score,
    _source,
    titles,
    contributors,
    descriptions,
    alternateIdentifiers,
    immutableResource,
    selectedLinkedResources,
  }) => {
    const history = useHistory()
    const [codeView, setCodeView] = useState(false)

    return (
      <Fade in={true} key={DOI}>
        <Card
          variant="outlined"
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            borderLeft: isMobile ? 'none' : '1px solid rgba(0, 0, 0, 0.12)',
          }}
        >
          <CardHeader
            title={<Typography variant="h6">{titles?.[0]?.title || 'Title missing'}</Typography>}
            subheader={
              <Typography variant="overline">
                {contributors?.[0]?.name || 'Contributor info missing'}
              </Typography>
            }
            action={
              <>
                {score ? (
                  <Tooltip title="Relevance to text filter (higher is better)">
                    <Typography color="textSecondary" variant="overline">
                      Score: {score.toFixed(3)}
                    </Typography>
                  </Tooltip>
                ) : null}
                <IconButton
                  onClick={() => setCodeView(!codeView)}
                  color={codeView ? 'primary' : 'inherit'}
                  aria-label="Show metadata JSON object"
                >
                  <CodeIcon />
                </IconButton>
              </>
            }
          />
          {codeView ? (
            <CardContent>
              <Fade key="1" in={codeView}>
                <div style={{ maxHeight: 400, overflowY: 'auto', overflowX: 'hidden' }}>
                  <pre style={{ whiteSpace: 'break-spaces' }}>
                    {JSON.stringify(_source, null, 2)}
                  </pre>
                </div>
              </Fade>
            </CardContent>
          ) : (
            <Fade key="2" in={!codeView}>
              <div>
                <QuickForm collapsed={true}>
                  {({ updateForm, collapsed }) => {
                    const content = descriptions?.[0]?.description || 'No description'
                    return (
                      <Collapse in={!collapsed} collapsedHeight={80}>
                        <CardContent>
                          {collapsed ? content.truncate(300) : content}
                          {descriptions?.[0]?.description.length > 300 ? (
                            <IconButton
                              style={{ padding: 0 }}
                              onClick={() => updateForm({ collapsed: !collapsed })}
                              color="primary"
                            >
                              {collapsed ? (
                                <Fade key="expand-description-collapsed" in={collapsed}>
                                  <ExpandMoreIcon />
                                </Fade>
                              ) : (
                                <Fade key="expand-description-expanded" in={!collapsed}>
                                  <ExpandLessIcon />
                                </Fade>
                              )}
                            </IconButton>
                          ) : null}
                        </CardContent>
                      </Collapse>
                    )
                  }}
                </QuickForm>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Button
                        fullWidth
                        startIcon={<ViewIcon />}
                        disabled={!alternateIdentifiers}
                        color="secondary"
                        size="small"
                        onClick={() =>
                          history.push(
                            `/records/${
                              alternateIdentifiers?.find(
                                ({ alternateIdentifierType: type }) => type === 'Plone'
                              ).alternateIdentifier
                            }`
                          )
                        }
                        variant="contained"
                        disableElevation
                      >
                        Metadata
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <DataDownloadButton
                        disableElevation
                        fullWidth
                        variant="contained"
                        color="secondary"
                        size="small"
                        immutableResource={immutableResource}
                      >
                        Download
                      </DataDownloadButton>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <CitationDialog color="secondary" fullWidth size="small" record={_source} />
                    </Grid>

                    {selectedLinkedResources?.map(({ id, toggled, toggle }) => {
                      return (
                        <Grid key={id} item xs={6} sm={3}>
                          <Tooltip title={'Select dataset for preview'}>
                            <Button
                              fullWidth
                              startIcon={<PreviewIcon />}
                              size="small"
                              color={toggled ? 'primary' : 'inherit'}
                              onClick={toggle}
                              variant="contained"
                              disableElevation
                            >
                              {toggled ? 'Remove' : 'preview'}
                            </Button>
                          </Tooltip>
                        </Grid>
                      )
                    })}
                  </Grid>
                </CardContent>
                <CardContent>
                  {DOI ? (
                    <Link uri={`https://doi.org/${DOI}`} />
                  ) : (
                    <Typography variant="overline">No DOI</Typography>
                  )}
                </CardContent>
              </div>
            </Fade>
          )}
        </Card>
      </Fade>
    )
  },
  ({ selectedLinkedResources: a }, { selectedLinkedResources: b }) => {
    let stopRender = true
    if (a?.length) {
      a.forEach(({ toggled }, i) => {
        if (toggled !== b[i].toggled) {
          stopRender = false
        }
      })
    }

    return stopRender
  }
)
