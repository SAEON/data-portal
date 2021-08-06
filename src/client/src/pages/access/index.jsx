import { useContext, Suspense, lazy } from 'react'
import { context as authenticationContext } from '../../contexts/authentication'
import { context as authorizationContext } from '../../contexts/authorization'
import Loading from '../../components/loading'
import ContentNav from '../../components/content-nav'
import UsersIcon from 'mdi-react/AccountMultipleIcon'
import RolesIcon from 'mdi-react/AccountLockIcon'
import PermissionsIcon from 'mdi-react/AxisLockIcon'
import AccessDenied from '../../components/access-denied'
import UserRolesProvider from './context'
import useTheme from '@material-ui/core/styles/useTheme'
import Fade from '@material-ui/core/Fade'
import Container from '@material-ui/core/Container'
import Header from './header'

const Users = lazy(() => import('./users'))
const Roles = lazy(() => import('./roles'))
const Permissions = lazy(() => import('./permissions'))

const sections = [
  {
    primaryText: 'Users',
    secondaryText: 'Manage application users',
    Icon: UsersIcon,
    requiredPermission: 'users:view',
    Section: Users,
  },
  {
    primaryText: 'Roles',
    secondaryText: 'Manage application roles',
    Icon: RolesIcon,
    requiredPermission: 'roles:view',
    Section: Roles,
  },
  {
    primaryText: 'Permissions',
    secondaryText: 'Manage application permissions',
    Icon: PermissionsIcon,
    requiredPermission: 'permissions:view',
    Section: Permissions,
  },
]

export default () => {
  const theme = useTheme()
  const isAuthenticated = useContext(authenticationContext).authenticate()
  const { hasPermission } = useContext(authorizationContext)

  if (!isAuthenticated) {
    return <Loading />
  }

  if (!hasPermission('/access')) {
    return (
      <div style={{ marginTop: theme.spacing(2) }}>
        <AccessDenied requiredPermission="/access" />
      </div>
    )
  }

  return (
    <UserRolesProvider>
      <Header />
      <div style={{ marginTop: theme.spacing(2) }} />
      <Container style={{ minHeight: 1000 }}>
        <ContentNav
          navItems={sections.filter(({ requiredPermission }) => hasPermission(requiredPermission))}
        >
          {({ activeIndex }) =>
            sections
              .filter(({ requiredPermission }) => hasPermission(requiredPermission))
              .map(({ Section, primaryText }, i) => {
                return (
                  <Suspense
                    key={primaryText}
                    fallback={
                      <Fade
                        timeout={theme.transitions.duration.regular}
                        in={activeIndex === i}
                        key={'loading'}
                      >
                        <span>
                          <Loading />
                        </span>
                      </Fade>
                    }
                  >
                    <Fade
                      timeout={theme.transitions.duration.regular}
                      in={activeIndex === i}
                      key={'loaded'}
                    >
                      <span style={{ display: activeIndex === i ? 'inherit' : 'none' }}>
                        <Section active={activeIndex === i} />
                      </span>
                    </Fade>
                  </Suspense>
                )
              })
          }
        </ContentNav>
      </Container>
      <div style={{ marginTop: theme.spacing(2) }} />
    </UserRolesProvider>
  )
}
