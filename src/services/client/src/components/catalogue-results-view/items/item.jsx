import React, { useState } from 'react'
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

export default ({ item }) => {
  const history = useHistory()
  const [codeView, toggleCodeView] = useState(false)
  const doc = item.target._source.metadata_json

  return (
    <Card
      variant="outlined"
      style={{
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <CardHeader
        title={<Typography variant="h6">{doc.titles?.[0]?.title || 'Title missing'}</Typography>}
        subheader={
          <Typography variant="overline">
            {doc.contributors?.[0]?.name || 'Contributor info missing'}
          </Typography>
        }
        action={
          <>
            {item.score ? (
              <Tooltip title="Relevance to text filter (higher is better)">
                <Typography color="textSecondary" variant="overline">
                  Score: {item.score.toFixed(3)}
                </Typography>
              </Tooltip>
            ) : null}
            <IconButton
              onClick={() => toggleCodeView(!codeView)}
              color={codeView ? 'primary' : 'default'}
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
              <pre style={{ whiteSpace: 'break-spaces' }}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
          </Fade>
        </CardContent>
      ) : (
        <Fade key="2" in={!codeView}>
          <div>
            <QuickForm collapsed={true}>
              {({ updateForm, collapsed }) => {
                const content = doc.descriptions?.[0]?.description || 'No description'
                return (
                  <Collapse in={!collapsed} collapsedSize={80}>
                    <CardContent>
                      {collapsed ? content.truncate(300) : content}
                      {doc.descriptions?.[0]?.description.length > 300 ? (
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
                    disabled={!doc.alternateIdentifiers}
                    color="secondary"
                    size="small"
                    onClick={() =>
                      history.push(
                        `/catalogue/${
                          doc.alternateIdentifiers?.find(
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
                  <Tooltip title={'This has not been implemented yet'}>
                    <span>
                      <Button
                        fullWidth
                        startIcon={<PreviewIcon />}
                        size="small"
                        color="secondary"
                        disabled={true}
                        onClick={() => null}
                        variant="contained"
                        disableElevation
                      >
                        Preview
                      </Button>
                    </span>
                  </Tooltip>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <DataDownloadButton
                    disableElevation
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="small"
                    immutableResource={doc.immutableResource}
                  >
                    Download
                  </DataDownloadButton>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <CitationDialog color="secondary" fullWidth size="small" record={doc} />
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              {doc.identifier ? (
                <Link uri={`https://doi.org/${doc.identifier.identifier}`} />
              ) : (
                <Typography>No DOI</Typography>
              )}
            </CardContent>
          </div>
        </Fade>
      )}
    </Card>
  )
}
