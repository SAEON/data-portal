import React, { lazy, Suspense, useContext } from 'react'
import { Grid, useMediaQuery, Typography, Fade } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'
import { RecordsSearchBox, Loading } from '../../components'
import { GlobalContext } from '../../modules/provider-global'
import useStyles from './style'
import clsx from 'clsx'

const MapProvider = lazy(() => import('../../modules/provider-map'))

export default () => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const { global } = useContext(GlobalContext)

  const { error, loading, data } = useQuery(
    gql`
      query catalogue($match: String!) {
        catalogue {
          records(match: $match) {
            totalCount
          }
        }
      }
    `,
    {
      variables: { match: global.text || '' },
    }
  )

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      {loading ? <Loading /> : undefined}
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
              <RecordsSearchBox resetGlobalStateOnSearch={true} autofocus={true} />
              {error ? (
                <Typography>{error.message}</Typography>
              ) : loading ? undefined : (
                <Fade key="results" in={!loading}>
                  <Typography variant="overline">
                    {data?.catalogue.records.totalCount} records
                  </Typography>
                </Fade>
              )}
            </Grid>
          </Grid>
        </MapProvider>
      </Suspense>
    </div>
  )
}
