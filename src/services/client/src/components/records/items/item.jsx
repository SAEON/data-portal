import React, { useState, useContext } from 'react'
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
import { UriStateContext } from '../../../modules/provider-uri-state'

export default ({ item }) => {
  const history = useHistory()
  const [codeView, setCodeView] = useState(false)
  const { uriState, setUriState } = useContext(UriStateContext)

  // Get preview
  const preview = (uriState || '').preview
    ?.split(',')
    ?.map(item => decodeURIComponent(item))
    ?.filter(_ => _)

  // Get record values
  const { score, target } = item
  const { _source } = target
  const { metadata_json } = _source
  const {
    identifier,
    titles,
    contributors,
    descriptions,
    alternateIdentifiers,
    immutableResource,
    linkedResources,
  } = metadata_json

  const DOI =
    identifier && identifier.identifierType.toUpperCase() === 'DOI'
      ? identifier.identifier
      : undefined

  return (
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
                {JSON.stringify(metadata_json, null, 2)}
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
                  <CitationDialog color="secondary" fullWidth size="small" record={metadata_json} />
                </Grid>

                {DOI &&
                  linkedResources
                    ?.filter(({ linkedResourceType: t }) => t.toUpperCase() === 'QUERY')
                    ?.map((_, i) => {
                      /**
                       * Selected previews are the record DOI
                       * + the position of the item in the linkedResources array
                       */
                      const id = `${DOI}~link ${i + 1}`
                      const added = preview?.includes(id)

                      return (
                        <Grid key={id} item xs={6} sm={3}>
                          <Tooltip title={'Select datasets for preview'}>
                            <Button
                              fullWidth
                              startIcon={<PreviewIcon />}
                              size="small"
                              color={added ? 'primary' : 'inherit'}
                              onClick={() => {
                                setUriState({
                                  preview: added
                                    ? [...preview].filter(p => p !== id)
                                    : [...new Set([...(preview || []), id])],
                                })
                              }}
                              variant="contained"
                              disableElevation
                            >
                              {added ? 'Remove from Preview' : 'Add to preview'}
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
  )
}
