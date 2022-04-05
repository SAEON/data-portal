import { useContext, Suspense, lazy } from 'react'
import DownloadsContextProvider from './downloads/context'
import { context as authenticationContext } from '../../contexts/authentication'
import { context as authorizationContext } from '../../contexts/authorization'
import Loading from '../../components/loading'
import ContentNav from '../../components/content-nav'
import UsersIcon from 'mdi-react/AccountMultipleIcon'
import DownloadsIcon from 'mdi-react/DownloadMultipleIcon'
import AccessDenied from '../../components/access-denied'
import { useTheme } from '@mui/material/styles'
import Fade from '@mui/material/Fade'
import Container from '@mui/material/Container'
import Header from './header'

const Downloads = lazy(() => import('./downloads'))
const Users = lazy(() => import('./users'))

const sections = [
  {
    primaryText: 'Downloads',
    secondaryText: 'Data downloads reports',
    // eslint-disable-next-line
    Icon: ({ active }) => <DownloadsIcon />,
    requiredPermission: 'site-analytics:view',
    Section: Downloads,
  },
  {
    primaryText: 'Users',
    secondaryText: 'User sessions',
    // eslint-disable-next-line
    Icon: ({ active }) => <UsersIcon />,
    requiredPermission: 'site-analytics:view',
    Section: Users,
  },
]

export default () => {
  const theme = useTheme()
  const isAuthenticated = useContext(authenticationContext).authenticate()
  const { hasPermission } = useContext(authorizationContext)

  if (!isAuthenticated) {
    return <Loading withHeight />
  }

  if (!hasPermission('/usage')) {
    return (
      <div style={{ minHeight: 1000, marginTop: theme.spacing(2) }}>
        <AccessDenied requiredPermission="/usage" />
      </div>
    )
  }

  return (
    <DownloadsContextProvider>
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
                        <Section />
                      </span>
                    </Fade>
                  </Suspense>
                )
              })
          }
        </ContentNav>
      </Container>
      <div style={{ marginTop: theme.spacing(2) }} />
    </DownloadsContextProvider>
  )
}
