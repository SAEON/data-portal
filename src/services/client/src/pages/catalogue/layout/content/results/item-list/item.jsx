import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
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
  GetApp as DownloadIcon,
  BarChart as PreviewIcon,
  Code as CodeIcon,
} from '@material-ui/icons'
import { Link, CitationDialog, DataDownloadButton } from '../../../../../../components'

export default ({ item }) => {
  const history = useHistory()
  const [codeView, toggleCodeView] = useState(false)
  const doc = item.target._source.metadata_json

  return (
    <Card style={{ marginBottom: 20 }} variant="outlined">
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
              color={codeView ? 'secondary' : 'primary'}
              aria-label="Show metadata JSON object"
            >
              <CodeIcon />
            </IconButton>
          </>
        }
      />
      {codeView ? (
        <CardContent>
          <Fade in={codeView}>
            <div style={{ maxHeight: 400, overflowY: 'auto', overflowX: 'hidden' }}>
              <pre style={{ whiteSpace: 'break-spaces' }}>{JSON.stringify(doc, null, 2)}</pre>
            </div>
          </Fade>
        </CardContent>
      ) : (
        <Fade in={!codeView}>
          <div>
            <CardContent>{doc.descriptions?.[0]?.description || 'No description'}</CardContent>
            <CardContent>
              <Button
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
                style={{ marginRight: 10 }}
                variant="contained"
                disableElevation
              >
                View Metadata
              </Button>
              <Tooltip title={'This has not been implemented yet'}>
                <span>
                  <Button
                    startIcon={<PreviewIcon />}
                    size="small"
                    color="primary"
                    disabled={true}
                    onClick={() => null}
                    style={{ marginRight: 10 }}
                    variant="contained"
                    disableElevation
                  >
                    Preview Dataset
                  </Button>
                </span>
              </Tooltip>

              <DataDownloadButton
                disableElevation
                variant="contained"
                color="primary"
                style={{ marginRight: 10 }}
                size="small"
                immutableResource={doc.immutableResource}
              >
                Download Data
              </DataDownloadButton>
              <CitationDialog size="small" json={doc} />
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
