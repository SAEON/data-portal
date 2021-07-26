import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import useTheme from '@material-ui/core/styles/useTheme'
import useStyles from './style'
import clsx from 'clsx'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink } from '../../hooks/use-share-link'
import SkipLink from '../../components/skip-link'
import SearchSummary from './_search-summary'
import Search from '../../components/search'
import Container from '@material-ui/core/Container'

export default () => {
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render`,
    params: true,
  })
  const classes = useStyles()
  const theme = useTheme()
  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
      <SkipLink href="#home-search" text="Skip to main content" />
      <main
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: window.location.pathname.includes('render') ? 0 : 48,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        id="home-search"
      >
        <Container>
          <Card
            className={clsx(classes.card, {
              [classes.mdAndDown]: !mdAndUp,
              [classes.mdAndUp]: mdAndUp,
            })}
            variant="outlined"
          >
            <Grid container item xs={12}>
              {mdAndUp && (
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
              )}

              {mdAndUp && (
                <Grid style={{ display: 'flex' }} item>
                  <Divider variant="middle" orientation={'vertical'} />
                </Grid>
              )}

              <Grid item style={{ flexGrow: 2 }}>
                <Search resetGlobalStateOnSearch={true} autofocus={true}>
                  <Typography variant="overline">
                    <SearchSummary />
                  </Typography>
                </Search>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </main>
    </>
  )
}
