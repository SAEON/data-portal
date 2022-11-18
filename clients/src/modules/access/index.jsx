import 'react-data-grid/lib/styles.css'
import { useContext, Suspense, lazy, useState, useMemo } from 'react'
import { context as authenticationContext } from '../../contexts/authentication'
import { context as authorizationContext } from '../../contexts/authorization'
import Loading from '../../components/loading'
import VerticalTabs from '../../packages/vertical-tabs'
import {
  AccountMultiple as UsersIcon,
  AccountLock as RolesIcon,
  AxisLock as PermissionsIcon,
} from '../../components/icons'
import AccessDenied from '../../components/access-denied'
import UserRolesProvider from './context'
import Fade from '@mui/material/Fade'
import Container from '@mui/material/Container'
import Header from './header'
import { Div, Span } from '../../components/html-tags'

const Users = lazy(() => import('./users'))
const Roles = lazy(() => import('./roles'))
const Permissions = lazy(() => import('./permissions'))

const _sections = [
  {
    primaryText: 'Users',
    secondaryText: 'Manage application users',
    Icon: () => <UsersIcon fontSize="medium" />,
    requiredPermission: 'users:view',
    Render: Users,
  },
  {
    primaryText: 'Roles',
    secondaryText: 'Manage application roles',
    Icon: () => <RolesIcon fontSize="medium" />,
    requiredPermission: 'roles:view',
    Render: Roles,
  },
  {
    primaryText: 'Permissions',
    secondaryText: 'Manage application permissions',
    Icon: () => <PermissionsIcon fontSize="medium" />,
    requiredPermission: 'permissions:view',
    Render: Permissions,
  },
]

export default () => {
  const [activeIndex, setActiveIndex] = useState(0)
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
      <Div sx={{ mt: theme => theme.spacing(2) }}>
        <AccessDenied requiredPermission="/access" />
      </Div>
    )
  }

  return (
    <UserRolesProvider>
      <Header />
      <Div sx={{ mt: theme => theme.spacing(2) }} />
      <Container sx={{ minHeight: 1000 }}>
        <VerticalTabs activeIndex={activeIndex} setActiveIndex={setActiveIndex} navItems={sections}>
          {sections.map(({ Render, primaryText }, i) => {
            return (
              <Suspense key={primaryText} fallback={<Loading />}>
                <Fade in={activeIndex === i} key={`loaded-${i}`}>
                  <Span sx={{ display: activeIndex === i ? 'inherit' : 'none' }}>
                    <Render active={activeIndex === i} />
                  </Span>
                </Fade>
              </Suspense>
            )
          })}
        </VerticalTabs>
      </Container>
      <Div sx={{ mt: theme => theme.spacing(2) }} />
    </UserRolesProvider>
  )
}
