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
} from '@material-ui/core'
import {
  Visibility as ViewIcon,
  BarChart as PreviewIcon,
  Code as CodeIcon,
} from '@material-ui/icons'
import { Link, CitationDialog, DataDownloadButton } from '../..'

export default ({ item }) => {
  const history = useHistory()
  const [codeView, toggleCodeView] = useState(false)
  const doc = item.target._source.metadata_json

  return (
    <Card variant="outlined" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
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
            <CardContent>{doc.descriptions?.[0]?.description || 'No description'}</CardContent>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Button
                    fullWidth
                    startIcon={<ViewIcon />}
                    disabled={!doc.alternateIdentifiers}
                    color="primary"
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
                        color="primary"
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
                    color="primary"
                    size="small"
                    immutableResource={doc.immutableResource}
                  >
                    Download
                  </DataDownloadButton>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <CitationDialog fullWidth size="small" json={doc} />
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
