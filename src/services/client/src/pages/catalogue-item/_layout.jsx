import React from 'react'
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Tooltip,
  Chip,
  CardHeader,
} from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import useStyles from './style'
import GetAppIcon from '@material-ui/icons/GetApp'
import { Link as SimpleLink, CitationDialog } from '../../components'
/**TO DO:
 * download button tooltips show download extension. currently hardcoded. set them to grab file extension
 * Figure out what sasdi.net -> Related Resources -> Data: Preview is equivalent to. json.linkedResources is similar but not the same
 * verify if SANS 1878 card at bottom of metaview should stay. its hardcorded currently because the values arent in metadata
 * remove div from bottom of page and size container better
 * figure out how to better manage citation-dialog <Dialog> size. more than 600px width causes scrollbar to appear
 * Bug Fixes:
 * bugfix: bottom of scrollbar is behind footer
 *
 * http://localhost:3001/catalogue/c770a2bfa4108b82725ae1174bf881cd
 * http://www.sasdi.net/metaview.aspx?uuid=c770a2bfa4108b82725ae1174bf881cd#downloads
 81db479c2c9386a6cfca5bc7e83c2c50
 */

const formatText = text => {
  return (text = text.replace(/([A-Z])/g, ' $1').trim())
}
export default ({ json, id }) => {
  const history = useHistory()
  const classes = useStyles()
  const gridItemSize = 10
  if (!id || !json) {
    return 'ID not found'
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{ marginTop: 10, marginBottom: 20 }}
        item
        xs={12}
        justify="flex-end"
      >
        {/* CITATTION */}
        <Grid item>
          <CitationDialog json={json} />
        </Grid>

        {/* METADATA Download */}
        <Grid item>
          <SimpleLink
            uri={'data:' + 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json))}
            download={`metadata_${id}.json`}
          >
            <Tooltip title="Download this page in JSON format">
              <Button
                variant="contained"
                color="primary"
                startIcon={<GetAppIcon />}
                disableElevation
              >
                Metadata
              </Button>
            </Tooltip>
          </SimpleLink>
        </Grid>

        {/* DATA DOWNLOAD */}
        <Grid item>
          <SimpleLink download={'test'} uri={json.immutableResource.resourceURL}>
            <Tooltip
              title={`${
                json.immutableResource.resourceDescription
              } (${json.immutableResource.resourceURL.replace(/.*\./, '')})`}
            >
              <Button
                disableElevation
                variant="contained"
                color="primary"
                startIcon={<GetAppIcon />}
              >
                Data
              </Button>
            </Tooltip>
          </SimpleLink>
        </Grid>
      </Grid>

      <Grid
        container
        // direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
        className={classes.grid}
      >
        {/* OVERVIEW */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardHeader
              style={{ textAlign: 'center' }}
              disableTypography
              title={
                <Typography style={{ margin: 'auto' }} gutterBottom variant="h4">
                  {json.titles[0].title}
                </Typography>
              }
              action={json.rightsList.map((rl, i) => (
                <SimpleLink key={`rights-list-right${i}`} uri={rl.rightsURI}>
                  <Tooltip title={rl.rights}>
                    <img src="https://licensebuttons.net/l/by/4.0/88x31.png" />
                  </Tooltip>
                </SimpleLink>
              ))}
            />
            <CardContent>
              <Typography variant="h6">Author</Typography>

              {json.creators.map(creator => (
                <div key={creator.name}>
                  <Typography variant="body2">
                    {creator.name}
                    <br />
                    {creator.affiliations.map(aff => aff.affiliation)}
                  </Typography>
                </div>
              ))}
              <br />

              <Typography variant="h6">Publisher </Typography>
              <Typography variant="body2">
                {`${json.publisher} : ${json.publicationYear}`}
              </Typography>
              <br />
              <Typography variant="h6">Resources </Typography>
              {json.linkedResources.map((lr, i) => (
                <div key={`linked-resource${i}`}>
                  <Typography variant="body2">
                    {lr.resourceDescription}
                    <b>
                      <em> ({lr.linkedResourceType})</em>
                    </b>
                  </Typography>
                  <SimpleLink uri={lr.resourceURL} />
                  <br />
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* CONTRIBUTORS */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5">
                Contributors
              </Typography>
              {json.contributors.map(contributor => (
                <div key={contributor.name}>
                  <Typography variant="h6">{formatText(contributor.contributorType)}</Typography>
                  <Typography variant="body2">
                    {contributor.name}
                    <br />
                    {contributor.affiliations.map(aff => aff.affiliation)}
                  </Typography>
                  <br />
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* KEYWORDS */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5">
                Keywords
              </Typography>
              <Grid container spacing={1} justify="flex-start">
                {json.subjects
                  .slice(0)
                  .sort((a, b) => (a.subject >= b.subject ? 1 : -1))
                  .map(subject => (
                    <Grid item key={subject.subject}>
                      <Chip
                        size="small"
                        clickable
                        icon={<SearchIcon />}
                        onClick={() => history.push(`/catalogue?terms=${subject.subject}`)}
                        label={subject.subject.toUpperCase()}
                      />
                    </Grid>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {/* ABSTRACT */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5">
                Abstract
              </Typography>
              <Typography variant="body2">
                {json.descriptions.map(desc =>
                  desc.descriptionType === 'Abstract' ? desc.description : undefined
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* IDENTIFIERS */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5">
                Identifiers
              </Typography>
              <Typography variant="h6"> Local</Typography>
              {json.alternateIdentifiers.map(ai => (
                <div key={ai.alternateIdentifier}>
                  <Typography variant="body2">
                    {ai.alternateIdentifier}
                    <br />
                  </Typography>
                </div>
              ))}
              <br />
              <Typography variant="h6">Identifier Type</Typography>
              <Typography variant="body2">{json.identifier.identifierType}</Typography>
              <br />
              <Typography variant="h6">Identifier</Typography>
              <Typography variant="body2">{json.identifier.identifier}</Typography>
              <br />
              <Typography variant="h6">URI</Typography>
              {json.alternateIdentifiers.map(alt => (
                <div key={alt.alternateIdentifier}>
                  <SimpleLink
                    uri={`http://www.sasdi.net/metaview.aspx?uuid=${alt.alternateIdentifier}`}
                  />
                  <br />
                </div>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* SANS 1878? */}
        <Grid item xs={gridItemSize}>
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom variant="h5">
                SANS 1878
              </Typography>
              <Typography variant="body2"></Typography>
            </CardContent>
          </Card>
        </Grid>
        <div style={{ height: '100px', width: '100%' }} />
      </Grid>
    </>
  )
}
