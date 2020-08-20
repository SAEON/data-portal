import React, { lazy, Suspense } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, useMediaQuery, Button } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { useTheme } from '@material-ui/core/styles'
import { RecordsSearchBox, Loading } from '../../components'
import useStyles from './style'
import clsx from 'clsx'

const MapProvider = lazy(() => import('../../modules/provider-map'))

export default () => {
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <Suspense fallback={<Loading />}>
        <MapProvider>
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
              <RecordsSearchBox />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={() =>
                  history.push({
                    pathname: '/records',
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
        </MapProvider>
      </Suspense>
    </div>
  )
}
