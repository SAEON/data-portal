import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ routes }) => {
  const theme = useTheme()

  return (
    <div style={{ position: 'relative' }}>
      <AppBar position="relative" color="primary">
        {/* DISCLAIMERS */}
        <Toolbar style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Container style={{ paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4) }}>
            {routes
              .filter(({ includeInFooter }) => includeInFooter)
              .map(({ label, Icon, to }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: theme.spacing(2),
                    marginTop: theme.spacing(2),
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
              ))}
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
