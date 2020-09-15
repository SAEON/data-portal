import React, { useContext } from 'react'
import { Grid, useMediaQuery, Typography, Fade } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'
import { RecordsSearch, Loading } from '../../components'
import { GlobalContext } from '../../modules/provider-global'
import useStyles from './style'
import clsx from 'clsx'

const CARD_BG_COLOUR = 'rgba(255,255,255,0.6)'

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
        <Grid item xs={12} style={{}}>
          <RecordsSearch
            style={{
              backgroundColor: CARD_BG_COLOUR,
              // borderRadius: theme.shape.borderRadius,
              // margin: 20,
              padding: 16,
            }}
            resetGlobalStateOnSearch={true}
            autofocus={true}
          >
            {error ? (
              <Typography>{error.message}</Typography>
            ) : loading ? undefined : (
              <Fade key="results" in={!loading}>
                <Typography variant="overline">
                  {data?.catalogue.records.totalCount} records
                </Typography>
              </Fade>
            )}
          </RecordsSearch>
        </Grid>
      </Grid>

      <img
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          height: 80,
          padding: 10,
          backgroundColor: CARD_BG_COLOUR,
        }}
        src="/saeon-logo.png"
      />
    </div>
  )
}
