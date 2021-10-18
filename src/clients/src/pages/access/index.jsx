import { useContext, Suspense, lazy, useState, useMemo } from 'react'
import { context as authenticationContext } from '../../contexts/authentication'
import { context as authorizationContext } from '../../contexts/authorization'
import Loading from '../../components/loading'
import VerticalTabs from '../../packages/vertical-tabs'
import UsersIcon from 'mdi-react/AccountMultipleIcon'
import RolesIcon from 'mdi-react/AccountLockIcon'
import PermissionsIcon from 'mdi-react/AxisLockIcon'
import AccessDenied from '../../components/access-denied'
import UserRolesProvider from './context'
import { useTheme } from '@mui/material/styles'
import Fade from '@mui/material/Fade'
import Container from '@mui/material/Container'
import Header from './header'

const Users = lazy(() => import('./users'))
const Roles = lazy(() => import('./roles'))
const Permissions = lazy(() => import('./permissions'))

const _sections = [
  {
    primaryText: 'Users',
    secondaryText: 'Manage application users',
    Icon: () => <UsersIcon />,
    requiredPermission: 'users:view',
    Render: Users,
  },
  {
    primaryText: 'Roles',
    secondaryText: 'Manage application roles',
    Icon: () => <RolesIcon />,
    requiredPermission: 'roles:view',
    Render: Roles,
  },
  {
    primaryText: 'Permissions',
    secondaryText: 'Manage application permissions',
    Icon: () => <PermissionsIcon />,
    requiredPermission: 'permissions:view',
    Render: Permissions,
  },
]

export default () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const theme = useTheme()
  const isAuthenticated = useContext(authenticationContext).authenticate()
  const { hasPermission } = useContext(authorizationContext)

  const sections = useMemo(
    () => _sections.filter(({ requiredPermission }) => hasPermission(requiredPermission)),
    []
  )

  if (!isAuthenticated) {
    return <Loading withHeight />
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
        <VerticalTabs activeIndex={activeIndex} setActiveIndex={setActiveIndex} navItems={sections}>
          {sections.map(({ Render, primaryText }, i) => {
            return (
              <Suspense key={primaryText} fallback={<Loading />}>
                <Fade
                  timeout={theme.transitions.duration.regular}
                  in={activeIndex === i}
                  key={'loaded'}
                >
                  <span style={{ display: activeIndex === i ? 'inherit' : 'none' }}>
                    <Render active={activeIndex === i} />
                  </span>
                </Fade>
              </Suspense>
            )
          })}
        </VerticalTabs>
      </Container>
      <div style={{ marginTop: theme.spacing(2) }} />
    </UserRolesProvider>
  )
}
