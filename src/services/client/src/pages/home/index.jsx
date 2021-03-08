import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import useTheme from '@material-ui/core/styles/useTheme'
import useStyles from './style'
import clsx from 'clsx'
import { isMobile } from 'react-device-detect'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink } from '../../hooks/use-share-link'
import SkipLink from '../../components/skip-link'
import SearchSummary from './_search'
import Search from '../../components/search'

export default () => {
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render`,
    params: true,
  })
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <SkipLink href="#home-search" text="Skip to main content" />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        <main id="home-search">
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
            <Card className={clsx(classes.card)} variant="outlined">
              <Grid container direction={isMobile ? 'column' : 'row'} item xs={12}>
                <Grid style={{ display: 'flex' }} item>
                  <a style={{ display: 'block', margin: 'auto' }} href={CATALOGUE_CLIENT_ADDRESS}>
                    <img
                      style={{
                        height: 56,
                      }}
                      src="/saeon-logo.png"
                      alt="Logo"
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
                      <SearchSummary />
                    </Typography>
                  </Search>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </main>
      </div>
    </>
  )
}
