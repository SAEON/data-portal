import { useContext, Suspense, lazy } from 'react'
import DownloadsContextProvider from './downloads/context'
import { context as authenticationContext } from '../../contexts/authentication'
import { context as authorizationContext } from '../../contexts/authorization'
import Loading from '../../components/loading'
import ContentNav from '../../components/content-nav'
import {
  AccountMultiple as UsersIcon,
  DownloadMultiple as DownloadsIcon,
} from '../../components/icons'
import AccessDenied from '../../components/access-denied'
import Fade from '@mui/material/Fade'
import Container from '@mui/material/Container'
import Header from './header'
import { Div, Span } from '../../components/html-tags'

const Downloads = lazy(() => import('./downloads'))
const Users = lazy(() => import('./users'))

const sections = [
  {
    primaryText: 'Downloads',
    secondaryText: 'Data downloads reports',
    // eslint-disable-next-line
    Icon: ({ active }) => <DownloadsIcon fontSize="medium" />,
    requiredPermission: 'site-analytics:view',
    Section: Downloads,
  },
  {
    primaryText: 'Users',
    secondaryText: 'User sessions',
    // eslint-disable-next-line
    Icon: ({ active }) => <UsersIcon fontSize="medium" />,
    requiredPermission: 'site-analytics:view',
    Section: Users,
  },
]

export default () => {
  const isAuthenticated = useContext(authenticationContext).authenticate()
  const { hasPermission } = useContext(authorizationContext)

  if (!isAuthenticated) {
    return <Loading withHeight />
  }

  if (!hasPermission('/usage')) {
    return (
      <Div sx={{ minHeight: 1000, mt: theme => theme.spacing(2) }}>
        <AccessDenied requiredPermission="/usage" />
      </Div>
    )
  }

  return (
    <DownloadsContextProvider>
      <Header />
      <ContentNav
        navItems={sections.filter(({ requiredPermission }) => hasPermission(requiredPermission))}
      >
        {({ activeIndex }) => {
          return (
            <Container sx={{ minHeight: 1000 }}>
              <Div sx={{ mt: theme => theme.spacing(2) }} />
              {sections
                .filter(({ requiredPermission }) => hasPermission(requiredPermission))
                .map(({ Section, primaryText }, i) => {
                  return (
                    <Suspense
                      key={primaryText}
                      fallback={
                        <Fade in={activeIndex === i} key={'loading'}>
                          <Span>
                            <Loading />
                          </Span>
                        </Fade>
                      }
                    >
                      <Fade in={activeIndex === i} key={'loaded'}>
                        <Span sx={{ display: activeIndex === i ? 'inherit' : 'none' }}>
                          <Section />
                        </Span>
                      </Fade>
                    </Suspense>
                  )
                })}
              <Div sx={{ mt: theme => theme.spacing(2) }} />
            </Container>
          )
        }}
      </ContentNav>
    </DownloadsContextProvider>
  )
}
