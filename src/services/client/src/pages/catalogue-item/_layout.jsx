import React from 'react'
import { Button, Grid, Card, CardContent, Typography } from '@material-ui/core'
import useStyles from './style'
// import clsx from 'clsx'
import SaveIcon from '@material-ui/icons/Save'

export default ({ json, id }) => {
  const classes = useStyles()
  return (
    <Grid
      container
      justify="center"
      className={classes.grid}
      style={{ height: '100%', overflowY: 'scroll' }}
    >
      <Grid item xs={9} className={classes.gridItem} style={{ margin: '20px' }}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ float: 'left', paddingRight: '7px' }}
            >
              {json.titles[0].title}
            </Typography>

            {/* https://jsfiddle.net/cowboy/hHZa9/ */}
            <a
              href={'data:' + 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(json))}
              download={`metadata_${id}.json`}
            >
              <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
                JSON
              </Button>
            </a>
            <h3>Author</h3>
            <Typography variant="body2" color="textSecondary" component="p">
              {json.creators[0].name}
              <br />
              {json.creators[0].affiliations[0].affiliation}
            </Typography>
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
              {json.rightsList[0].rights}
              <br />
              <a href={json.rightsList[0].rightsURI}>{json.rightsList[0].rightsURI}</a>
            </Typography>
            <h3>Publisher</h3>
            <Typography variant="body2" color="textSecondary" component="p">
              {`${json.publisher} : ${json.publicationYear}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={9} className={classes.gridItem} style={{ margin: '20px' }}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              metadata
            </Typography>
            {JSON.stringify(json)}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={9} className={classes.gridItem} style={{ margin: '20px' }}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Contributors
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={9} className={classes.gridItem} style={{ margin: '20px' }}>
        <Card className={classes.card}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Abstract
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
