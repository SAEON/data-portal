import { useContext } from 'react'
import { Grid, useMediaQuery, Typography, Fade, Divider } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { gql } from '@apollo/client'
import RecordsSearch from '../../components/records-search'
import Loading from '../../components/loading'
import { GlobalContext } from '../../contexts/global'
import useStyles from './style'
import clsx from 'clsx'
import { isMobile } from 'react-device-detect'
import { CATALOGUE_CLIENT_ADDRESS, CATALOGUE_API_GQL_ADDRESS } from '../../config'
import { WithQglQuery, setShareLink } from '../../hooks'

export default () => {
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render`,
    params: true,
  })
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const { global } = useContext(GlobalContext)

  return (
    <WithQglQuery
      QUERY={gql`
        query catalogue($text: String!) {
          catalogue {
            id
            records(text: $text) {
              totalCount
            }
          }
        }
      `}
      variables={{ text: global.text || '' }}
    >
      {({ error, loading, data }) => {
        if (error) {
          throw new Error(`${CATALOGUE_API_GQL_ADDRESS}: ${error}`)
        }

        return (
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            {loading && <Loading />}

            <Grid
              container
              style={{
                position: 'absolute',
                top:
                  window.innerHeight / 2 -
                  (window.location.pathname.includes('render') ? 0 : 48) -
                  95 / 2,
                zIndex: 1,
              }}
              alignItems="stretch"
              item
              className={clsx({
                [classes.mobile]: !matches,
                [classes.notMobile]: matches,
              })}
              xs={12}
              md={6}
            >
              <Grid
                container
                direction={isMobile ? 'column' : 'row'}
                item
                xs={12}
                className={clsx(classes.grid)}
              >
                <Grid style={{ display: 'flex' }} item>
                  <a style={{ display: 'block', margin: 'auto' }} href={CATALOGUE_CLIENT_ADDRESS}>
                    <img
                      style={{
                        height: 56,
                      }}
                      src="/saeon-logo.png"
                    />
                  </a>
                </Grid>
                <Grid style={{ display: 'flex' }} item>
                  {isMobile ? (
                    <div style={{ margin: 4 }} />
                  ) : (
                    <Divider variant="middle" orientation={'vertical'} />
                  )}
                </Grid>
                <Grid item style={{ flexGrow: 2 }}>
                  <RecordsSearch resetGlobalStateOnSearch={true} autofocus={true}>
                    <Typography variant="overline">
                      {loading ? (
                        <Fade key="waiting" in={loading}>
                          <span>...</span>
                        </Fade>
                      ) : (
                        <Fade key="results" in={!loading}>
                          <span>{data?.catalogue.records.totalCount} records</span>
                        </Fade>
                      )}
                    </Typography>
                  </RecordsSearch>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )
      }}
    </WithQglQuery>
  )
}
