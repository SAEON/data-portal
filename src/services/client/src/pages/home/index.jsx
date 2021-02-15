import { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Divider from '@material-ui/core/Divider'
import useTheme from '@material-ui/core/styles/useTheme'
import { gql } from '@apollo/client'
import Search from '../../components/search'
import { context as globalContext } from '../../contexts/global'
import useStyles from './style'
import clsx from 'clsx'
import { isMobile } from 'react-device-detect'
import { CATALOGUE_CLIENT_ADDRESS, CATALOGUE_API_GQL_ADDRESS } from '../../config'
import { setShareLink } from '../../hooks/use-share-link'
import WithGqlQuery from '../../hooks/with-gql-query'

export default () => {
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render`,
    params: true,
  })
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))
  const { global } = useContext(globalContext)

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
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
            <Search resetGlobalStateOnSearch={true} autofocus={true}>
              <Typography variant="overline">
                <WithGqlQuery
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
                      throw new Error(
                        `${CATALOGUE_API_GQL_ADDRESS}: ${error}\n\nIt is likely that Elasticsearch has not been configured`
                      )
                    }

                    return loading ? (
                      <Fade key="waiting" in={loading}>
                        <span>...</span>
                      </Fade>
                    ) : (
                      <Fade key="results" in={!loading}>
                        <span>{data?.catalogue.records.totalCount} records</span>
                      </Fade>
                    )
                  }}
                </WithGqlQuery>
              </Typography>
            </Search>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
