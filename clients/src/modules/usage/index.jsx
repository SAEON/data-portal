import 'react-data-grid/lib/styles.css'
import { useContext, Suspense, lazy, useRef } from 'react'
import { context as authenticationContext } from '../../contexts/authentication'
import { context as authorizationContext } from '../../contexts/authorization'
import Loading from '../../components/loading'
import ContentNav from '../../components/content-nav'
import {
  AccountMultiple as UsersIcon,
  DownloadMultiple as DownloadsIcon,
  Chat as ChatIcon,
  ChartBar as ChartBarIcon,
} from '../../components/icons'
import AccessDenied from '../../components/access-denied'
import Fade from '@mui/material/Fade'
import Header from './header'
import { Div, Span } from '../../components/html-tags'

const Downloads = lazy(() => import('./downloads'))
const Usage = lazy(() => import('./usage'))
const Feedback = lazy(() => import('./feedback'))
const Logins = lazy(() => import('./logins'))

const sections = [
  {
    primaryText: 'Downloads',
    secondaryText: 'Data downloads reports',
    Icon: ({ active }) => (
      <DownloadsIcon color={active ? 'primary' : 'default'} fontSize="medium" />
    ),
    requiredPermission: 'logs:download:view',
    Section: Downloads,
  },
  {
    primaryText: 'Usage',
    secondaryText: 'Application renders',
    Icon: ({ active }) => <ChartBarIcon color={active ? 'primary' : 'default'} fontSize="medium" />,
    requiredPermission: 'logs:appRender:view',
    Section: Usage,
  },
  {
    primaryText: 'Login history',
    secondaryText: 'Most recent 1000 logins',
    Icon: ({ active }) => <UsersIcon color={active ? 'primary' : 'default'} fontSize="medium" />,
    requiredPermission: 'logs:authentication:view',
    Section: Logins,
  },
  {
    primaryText: 'Feedback',
    secondaryText: 'Voluntary user feedback',
    Icon: ({ active }) => <ChatIcon color={active ? 'primary' : 'default'} fontSize="medium" />,
    requiredPermission: 'user-form-submissions:view',
    Section: Feedback,
  },
]

export default () => {
  const headerRef = useRef(null)
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
    <>
      <Header ref={headerRef} />
      <ContentNav
        navItems={sections.filter(({ requiredPermission }) => hasPermission(requiredPermission))}
      >
        {({ activeIndex }) => {
          return (
            <Div
              sx={theme => ({
                position: 'relative',
                mx: 1,
                my: theme => theme.spacing(2),
                [theme.breakpoints.up('lg')]: {
                  mx: 0,
                },
              })}
            >
              {sections
                .filter(({ requiredPermission }) => hasPermission(requiredPermission))
                .map(({ Section, primaryText }, i) => {
                  return (
                    activeIndex === i && (
                      <Suspense
                        key={primaryText}
                        fallback={
                          <Fade in={activeIndex === i} key={`loading-${primaryText}`}>
                            <Span>
                              <Loading sx={{ position: 'relative' }} />
                            </Span>
                          </Fade>
                        }
                      >
                        <Fade in={activeIndex === i} key={`loaded-${primaryText}`}>
                          <Span>
                            <Section headerRef={headerRef} />
                          </Span>
                        </Fade>
                      </Suspense>
                    )
                  )
                })}
            </Div>
          )
        }}
      </ContentNav>
    </>
  )
}
