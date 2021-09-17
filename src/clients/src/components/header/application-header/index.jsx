import Toolbar_ from './toolbar'
import Authentication from './authentication'
import NavigationMenu from './navigation-menu'
import useTheme from '@material-ui/core/styles/useTheme'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import Breadcrumbs from './breadcrumbs'

export const Toolbar = Toolbar_

export default ({ routes, disableBreadcrumbs, ...props }) => {
  const theme = useTheme()

  return (
    <Toolbar_ {...props}>
      {/* NAVIGATION MENU */}
      <div style={{ marginLeft: theme.spacing(1) }} />
      <NavigationMenu routes={routes} />
      <Hidden xsDown>
        <Divider
          flexItem
          orientation="vertical"
          style={{ marginLeft: theme.spacing(1), marginRight: theme.spacing(2) }}
        />
      </Hidden>

      <Hidden smDown>{!disableBreadcrumbs && <Breadcrumbs routes={routes} />}</Hidden>

      <div style={{ marginLeft: 'auto' }} />

      <Authentication />
    </Toolbar_>
  )
}
