import { useContext } from 'react'
import { Grid, useMediaQuery, Typography, Fade, Divider } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { gql } from '@apollo/client'
import { RecordsSearch, Loading } from '../../components'
import { GlobalContext } from '../../contexts/global'
import useStyles from './style'
import clsx from 'clsx'
import { isMobile } from 'react-device-detect'
import { CLIENT_HOST_ADDRESS, GQL_PROVIDER } from '../../config'
import { WithQglQuery, setShareLink } from '../../hooks'

const CARD_BG_COLOUR = 'rgba(255,255,255,0.75)'

export default () => {
  setShareLink({
    uri: `${CLIENT_HOST_ADDRESS}/render`,
    params: true,
  })
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const { global } = useContext(GlobalContext)

  return (
    <WithQglQuery
      QUERY={gql`
        query catalogue($match: String!) {
          catalogue {
            records(match: $match) {
              totalCount
            }
          }
        }
      `}
      variables={{ match: global.text || '' }}
    >
      {({ error, loading, data }) => {
        if (error) {
          throw new Error(`${GQL_PROVIDER}: ${error}`)
        }

        return (
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            {loading ? <Loading /> : undefined}

            <Grid
              container
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
              <Grid
                container
                direction={isMobile ? 'column' : 'row'}
                item
                xs={12}
                style={{
                  backgroundColor: CARD_BG_COLOUR,
                  padding: 16,
                }}
              >
                <Grid style={{ display: 'flex' }} item>
                  <a style={{ display: 'block', margin: 'auto' }} href={CLIENT_HOST_ADDRESS}>
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
