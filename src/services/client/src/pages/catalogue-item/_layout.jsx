import React from 'react'
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Tooltip,
  CardMedia,
  Chip,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import useStyles from './style'
import GetAppIcon from '@material-ui/icons/GetApp'
import LinkIcon from '@material-ui/icons/Link'
import { Link as SimpleLink } from '../../components'
/**TO DO:
 * download button tooltips show download extension. currently hardcoded. set them to grab file extension
 * cite button in overview with popup
 * overview is missing some buttons from sasdi
 * tag a git issue to all git commits
 * figure out flex positioning of overview card
 * verify validity of assumed Keyword hrefs %20 vs +
 * make sure array elements have keys
 * Figure out what sasdi.net -> Related Resources -> Data: Preview is equivalent to. json.linkedResources is similar but not the same
 * verify Indentiferes.Local.  json.alternativeIdentifiers has the value but is an array
 * verify if SANS 1878 card at bottom of metaview should stay. its hardcorded currently because the values arent in metadata
 * iframe size should be dynamic (up to a maximum)
 * iframe is hardcoded. change it to be taken from json
 * remove div from bottom of page and sizing container better
 *
 * Bug Fixes:
 * bugfix: bottom of scrollbar is behind footer
 * scrolling on map also scrolls page. Only one should scroll
 *
 * http://localhost:3001/catalogue/c770a2bfa4108b82725ae1174bf881cd
 * http://www.sasdi.net/metaview.aspx?uuid=c770a2bfa4108b82725ae1174bf881cd#downloads
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

                <br />
                <br />
                <Typography variant="h6">Publisher </Typography>
                <Typography variant="body2">
                  {`${json.publisher} : ${json.publicationYear}`}
                </Typography>
              </CardContent>
              <div id="download-buttons" style={{ bottom: '0px' }} className={classes.cardControls}>
                <Divider />

                <Typography variant="body2">
                  {json.rightsList.map((rl, i) => (
                    <Tooltip title={rl.rights} key={`rights-list-right${i}`}>
                      <SimpleLink uri={rl.rightsURI}>
                        <img src="https://licensebuttons.net/l/by/4.0/88x31.png" />
                      </SimpleLink>
                    </Tooltip>
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
                    >
                      Metadata
                    </Button>
                  </Tooltip>
                </a>
                <a href={json.immutableResource.resourceURL}>
                  <Tooltip title=".zip">
                    <Button variant="contained" color="primary" startIcon={<GetAppIcon />}>
                      Data
                      {/* {
                      json.immutableResource.resourceURL.split('/')[
                        json.immutableResource.resourceURL.split('/').length - 1
                      ]
                    } */}
                    </Button>
                  </Tooltip>
                </a>
              </div>
            </div>
            <CardMedia className={classes.cardMedia}>
              {json.linkedResources.map((lr, i) => (
                <iframe
                  src={lr.resourceURL}
                  style={{ height: '500px', width: '600px', border: 'none' }}
                  key={`linked-resource${i}`}
                ></iframe>
              ))}
            </CardMedia>
          </Card>
        </Grid>

        {/* CONTRIBUTORS */}
        <Grid item xs={gridItemSize} className={classes.gridItem}>
          <Card variant="outlined" className={classes.card}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Contributors
              </Typography>
              {json.contributors.map((contributor, i) => (
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
              {json.alternateIdentifiers.map((alt, i) => (
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
              <Typography variant="body2">Coverage begin date: 2005</Typography>
            </CardContent>
          </Card>
        </Grid>
        <div style={{ height: '100px', width: '100%' }} />
      </Grid>
    </div>
  )
}
