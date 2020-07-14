import React from 'react'
import { Button, Grid, Card, CardContent, Typography, Tooltip, Chip } from '@material-ui/core'
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
    <div className={classes.rootContainer}>
      <Grid
        container
        // direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
        className={classes.grid}
      >
        {/* OVERVIEW */}
        <Grid item xs={gridItemSize} className={classes.gridItem}>
          <Card variant="outlined" className={classes.card}>
            <div className={classes.cardContentContainer}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {json.titles[0].title}
                </Typography>
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
              <div id="card-controls" className={classes.cardControls}>
                <Typography variant="body2">
                  <CitationDialog json={json} />
                  {json.rightsList.map((rl, i) => (
                    <SimpleLink key={`rights-list-right${i}`} uri={rl.rightsURI}>
                      <Tooltip title={rl.rights}>
                        <img src="https://licensebuttons.net/l/by/4.0/88x31.png" />
                      </Tooltip>
                    </SimpleLink>
                  ))}
                </Typography>
                <a
                  href={
                    'data:' + 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json))
                  }
                  download={`metadata_${id}.json`}
                  style={{ textDecoration: 'none' }}
                >
                  <Tooltip title=".json">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<GetAppIcon />}
                      disableElevation
                    >
                      Metadata
                    </Button>
                  </Tooltip>
                </a>
                <a href={json.immutableResource.resourceURL}>
                  <Tooltip title=".zip">
                    <Button variant="contained" color="primary" startIcon={<GetAppIcon />}>
                      Data
                    </Button>
                  </Tooltip>
                </a>
              </div>
            </div>
          </Card>
        </Grid>

        {/* CONTRIBUTORS */}
        <Grid item xs={gridItemSize} className={classes.gridItem}>
          <Card variant="outlined" className={classes.card}>
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
        <Grid item xs={gridItemSize} className={classes.gridItem}>
          <Card variant="outlined" className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Keywords
              </Typography>
              {json.subjects.map(subject => (
                <Chip
                  size="small"
                  clickable
                  onClick={() => history.push(`/catalogue?search=${subject.subject}`)}
                  key={subject.subject}
                  className={classes.button}
                  label={subject.subject}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
        {/* ABSTRACT */}
        <Grid item xs={gridItemSize} className={classes.gridItem}>
          <Card variant="outlined" className={classes.card}>
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
        <Grid item xs={gridItemSize} className={classes.gridItem}>
          <Card variant="outlined" className={classes.card}>
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
        <Grid item xs={gridItemSize} className={classes.gridItem}>
          <Card variant="outlined" className={classes.card}>
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
    </div>
  )
}
