import Toolbar_ from './toolbar'
import Authentication from './authentication'
import NavigationMenu from './navigation-menu'
import Hidden from '@mui/material/Hidden'
import Divider from '@mui/material/Divider'
import Breadcrumbs from './breadcrumbs'
import { Div } from '../../html-tags'

export const Toolbar = Toolbar_

export default ({ contentBase, routes, disableBreadcrumbs, ...props }) => {
  return (
    <Toolbar_ {...props}>
      {/* NAVIGATION MENU */}
      <Div sx={{ ml: 1 }} />
      <NavigationMenu routes={routes} />
      <Hidden smDown>
        <Divider flexItem orientation="vertical" sx={{ ml: 1, mr: 2 }} />
      </Hidden>

      <Hidden mdDown>
        {!disableBreadcrumbs && <Breadcrumbs contentBase={contentBase} routes={routes} />}
      </Hidden>

      <Div sx={{ ml: 'auto' }} />

      <Authentication />
    </Toolbar_>
  )
}
