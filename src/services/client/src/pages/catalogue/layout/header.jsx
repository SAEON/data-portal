import React from 'react'
import { Grid, AppBar, Toolbar } from '@material-ui/core'
import { CatalogueSearchField } from '../../../components'
import useStyles from '../style'

export default ({ updateSubjects }) => {
  const classes = useStyles()
  return (
    <AppBar position="relative" variant="outlined" style={{ border: 'none' }}>
      <Toolbar className={classes.toolbar}>
        <Grid style={{ alignSelf: 'center' }} container item justify="center" xs={12}>
          <Grid style={{ width: '100%' }} item md={6}>
            <CatalogueSearchField
              onChange={selectedOptions => updateSubjects(selectedOptions)}
              classes={classes}
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
