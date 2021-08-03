import { useMemo } from 'react'
import Toolbar_ from './toolbar'
import Authentication from './authentication'
import { useLocation } from 'react-router-dom'
import NavigationMenu from './navigation-menu'
import useTheme from '@material-ui/core/styles/useTheme'

export const Toolbar = Toolbar_

export default ({ routes }) => {
  const theme = useTheme()
  const { pathname } = useLocation()
  const isLoginPage = useMemo(() => pathname.includes('login'), [pathname])

  return (
    <Toolbar_>
      <NavigationMenu routes={routes} />
      <Authentication
        style={{
          marginRight: theme.spacing(1),
          marginLeft: 'auto',
          display: isLoginPage ? 'none' : 'block',
        }}
      />
    </Toolbar_>
  )
}
