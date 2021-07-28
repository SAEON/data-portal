import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import NavItems from '../header/menu-bar/nav/_nav-items'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import useTheme from '@material-ui/core/styles/useTheme'

export default () => {
  const theme = useTheme()

  return (
    <div style={{ position: 'relative' }}>
      <AppBar position="relative" color="primary">
        <Container style={{ paddingTop: theme.spacing(2) }}>
          {/* DISCLAIMERS */}
          <Toolbar style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {NavItems.filter(({ includeInFooter }) => includeInFooter).map(
              ({ label, Icon, to }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
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
              )
            )}
          </Toolbar>

          {/* COPYRIGHT */}
          <Toolbar style={{ display: 'flex', justifyContent: 'center' }} variant="dense">
            <Typography variant="overline" variantMapping={{ overline: 'p' }}>
              © SAEON 2020 - {new Date().getFullYear()}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
