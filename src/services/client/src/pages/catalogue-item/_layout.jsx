import React from 'react'
import { Button, IconButton, Grid, Card, CardContent, Typography } from '@material-ui/core'
import useStyles from './style'
// import clsx from 'clsx'
import GetAppIcon from '@material-ui/icons/GetApp'

/**TO DO:
 * format strings like ContactPerson to be Contact Person
 * neaten visual spacing of Keywords
 * verify validity of assumed Keyword hrefs. No link in metadata. just linked to a text search instead. Also verify %20 vs +
 * make sure array elements have keys
 * Figure out what sasdi.net -> Related Resources -> Data: Preview is equivalent to. json.linkedResources is similar but not the same
 * verify Indentiferes.Local.  json.alternativeIdentifiers has the value but is an array
 */
export default ({ json, id }) => {
  const classes = useStyles()
  return (
    <Grid container justify="center" className={classes.grid}>
      {/* OVERVIEW */}
      <Grid item xs={9} className={classes.gridItem}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              // style={{ float: 'left', paddingRight: '7px' }}
            >
              {json.titles[0].title}

              {/* test href in other browsers. confirm utf-8 charset is appropriate */}
              <a
                href={
                  'data:' + 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json))
                }
                download={`metadata_${id}.json`}
                style={{ float: 'right', top: 0, textDecoration: 'none' }}
              >
                <Button variant="contained" color="secondary" startIcon={<GetAppIcon />}>
                  JSON
                </Button>
                <IconButton color="secondary">
                  <GetAppIcon />
                </IconButton>
              </a>
            </Typography>
            <h3>Author</h3>
            <Typography variant="body2" color="textSecondary" component="p">
              {json.creators.map(creator => (
                <>
                  {creator.name}
                  <br />
                  {creator.affiliations.map(aff => aff.affiliation)}
                </>
              ))}
              <br />
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
              {json.rightsList.map(rl => (
                <>
                  {rl.rights}
                  <br />
                  <a href={rl.rightsURI} target="_blank" rel="noreferrer">
                    {rl.rightsURI}
                  </a>
                </>
              ))}
            </Typography>
            <br />
            <h3>Publisher</h3>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${json.publisher} : ${json.publicationYear}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* CONTRIBUTORS */}
      <Grid item xs={9} className={classes.gridItem}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Contributors
            </Typography>
            {json.contributors.map((contributor, i) => (
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                key={`contributor-${i}`}
              >
                {contributor.contributorType} : {contributor.name}
                <br />
                {contributor.affiliations.map(aff => aff.affiliation)}
                <br />
                <br />
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* KEYWORDS */}
      <Grid item xs={9} className={classes.gridItem}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Keywords
            </Typography>
            {json.subjects.map((subject, i) => (
              <a
                href={`http://www.sasdi.net/sresults.aspx?text=${subject.subject}`}
                target="_blank"
                rel="noreferrer"
                key={`keyword-${i}`}
              >
                {subject.subject} |
              </a>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* ABSTRACT */}
      <Grid item xs={9} className={classes.gridItem}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Abstract
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {json.descriptions.map(desc =>
                desc.descriptionType === 'Abstract' ? desc.description : undefined
              )}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* RELATED RESOURCES */}
      <Grid item xs={9} className={classes.gridItem}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Resources
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Data: Preview?
              <br />
              Download:
              <a href={json.immutableResource.resourceURL}>
                {
                  json.immutableResource.resourceURL.split('/')[
                    json.immutableResource.resourceURL.split('/').length - 1
                  ]
                }
              </a>
              <br />
              <br />
              {json.linkedResources.map(lr => (
                <>
                  {lr.resourceDescription}
                  <br />
                  <a href={lr.resourceURL} target="_blank" rel="noreferrer">
                    {/* {lr.resourceURL} */}
                    link
                  </a>
                </>
              ))}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* IDENTIFIERS */}
      <Grid item xs={9} className={classes.gridItem}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Identifiers
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {/* Local: {json} */}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* SANS 1878? */}
      <Grid item xs={9} className={classes.gridItem}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              SANS 1878 ||| DEV NOTE: Should this card be removed? these values are not within the
              metadata
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Coverage begin date: 2005
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
