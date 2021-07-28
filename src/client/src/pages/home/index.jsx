import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import useTheme from '@material-ui/core/styles/useTheme'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import SkipLink from '../../components/skip-link'
import SearchSummary from './_search-summary'
import Search from '../../components/search'
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'

export default () => {
  const theme = useTheme()

  return (
    <>
      <SkipLink href="#home-search" text="Skip to main content" />
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card
          style={{
            backgroundColor: theme.backgroundColor,
            padding: theme.spacing(3),
            width: '100%',
          }}
          variant="outlined"
        >
          <Grid container item xs={12}>
            <Hidden smDown>
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
              <Divider variant="middle" orientation={'vertical'} flexItem />
            </Hidden>

            <Grid item style={{ flexGrow: 1 }}>
              <main id="home-search">
                <Search resetGlobalStateOnSearch={true} autofocus={true}>
                  <Typography variant="overline">
                    <SearchSummary />
                  </Typography>
                </Search>
              </main>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  )
}
