import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import useTheme from '@material-ui/core/styles/useTheme'
import Grid from '@material-ui/core/Grid'
import Contact from './_contact'

export default ({ routes }) => {
  const theme = useTheme()

  return (
    <div style={{ position: 'relative' }}>
      <AppBar position="relative" color="primary">
        {/* DISCLAIMERS */}
        <Toolbar style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Container style={{ paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4) }}>
            <Grid container>
              <Grid container item xs={12} sm={6}>
                {routes
                  .filter(({ includeInFooter }) => includeInFooter)
                  .map(({ label, Icon, to }) => (
                    <Grid item xs={12} key={label}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Icon size={18} />
                        <Typography
                          component={({ style, ...otherProps }) => (
                            <Link
                              {...otherProps}
                              style={Object.assign(
                                { ...style },
                                { color: 'white', marginLeft: theme.spacing(1) }
                              )}
                              to={to}
                              component={RouterLink}
                              key={label}
                            >
                              {label}
                            </Link>
                          )}
                          variant="overline"
                        >
                          {label}
                        </Typography>
                      </div>
                    </Grid>
                  ))}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Contact />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>

        {/* COPYRIGHT */}
        <Toolbar
          style={{ backgroundColor: theme.palette.primary.dark, minHeight: theme.spacing(1) }}
        >
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="overline" variantMapping={{ overline: 'p' }}>
              © SAEON 2020 - {new Date().getFullYear()}
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  )
}
