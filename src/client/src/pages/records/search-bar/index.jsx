import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import useTheme from '@material-ui/core/styles/useTheme'
import Search from '../../../components/search'
import useStyles from './style'
import { CATALOGUE_CLIENT_ADDRESS } from '../../../config'
import Hidden from '@material-ui/core/Hidden'
import Container from '@material-ui/core/Container'

export default ({ children }) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Container>
          <Grid container spacing={0} justifyContent="center">
            <Hidden xsDown>
              <Grid style={{ display: 'flex' }} item>
                <a style={{ display: 'block', margin: 'auto' }} href={CATALOGUE_CLIENT_ADDRESS}>
                  <img height={80} src="/saeon-logo-white.png" alt="Logo" />
                </a>
              </Grid>
              <Divider
                className={classes.divider}
                variant="middle"
                orientation="vertical"
                flexItem
              />
            </Hidden>

            <Grid item style={{ flexGrow: 1 }}>
              <Search
                className={classes.recordsSearchBox}
                color={'secondary'}
                inputProps={{
                  className: classes.input,
                }}
                iconProps={{ style: { color: theme.palette.common.white } }}
                autofocus={true}
              />
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div style={{ display: 'block', width: '100%' }}>{children}</div>
      </div>
    </>
  )
}
