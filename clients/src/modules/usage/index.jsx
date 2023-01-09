import { useContext, Suspense, lazy } from 'react'
import DownloadsContextProvider from './downloads/context'
import { context as authenticationContext } from '../../contexts/authentication'
import { context as authorizationContext } from '../../contexts/authorization'
import Loading from '../../components/loading'
import ContentNav from '../../components/content-nav'
import {
  AccountMultiple as UsersIcon,
  DownloadMultiple as DownloadsIcon,
  Chat as ChatIcon,
} from '../../components/icons'
import AccessDenied from '../../components/access-denied'
import Fade from '@mui/material/Fade'
import Container from '@mui/material/Container'
import Header from './header'
import { Div, Span } from '../../components/html-tags'

const Downloads = lazy(() => import('./downloads'))
const Users = lazy(() => import('./users'))
const Feedback = lazy(() => import('./feedback'))

const sections = [
  {
    primaryText: 'Downloads',
    secondaryText: 'Data downloads reports',
    Icon: ({ active }) => (
      <DownloadsIcon color={active ? 'primary' : 'default'} fontSize="medium" />
    ),
    requiredPermission: 'site-analytics:view',
    Section: Downloads,
  },
  {
    primaryText: 'Usage',
    secondaryText: 'User sessions',
    Icon: ({ active }) => <UsersIcon color={active ? 'primary' : 'default'} fontSize="medium" />,
    requiredPermission: 'site-analytics:view',
    Section: Users,
  },
  {
    primaryText: 'Feedback',
    secondaryText: 'User feedback',
    Icon: ({ active }) => <ChatIcon color={active ? 'primary' : 'default'} fontSize="medium" />,
    requiredPermission: 'download-forms:view',
    Section: Feedback,
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
