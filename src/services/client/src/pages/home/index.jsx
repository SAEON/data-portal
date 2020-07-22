import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, useMediaQuery, Button } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { useTheme } from '@material-ui/core/styles'
import { CatalogueSearchField } from '../../components'
import useStyles from './style'
import clsx from 'clsx'

export default () => {
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Grid
      container
      spacing={2}
      style={{ position: 'absolute', top: 'calc(50% - 120px)', zIndex: 1 }}
      alignItems="stretch"
      item
      className={clsx({
        [classes.mobile]: !matches,
        [classes.notMobile]: matches,
      })}
      xs={12}
      md={6}
    >
      {/* Header */}
      <Grid item xs={12}>
        <CatalogueSearchField />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() =>
            history.push({
              pathname: '/catalogue',
              search: window.location.search,
            })
          }
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
          startIcon={<SearchIcon />}
        >
          Search our catalogue
        </Button>
      </Grid>
    </Grid>
  )
}
