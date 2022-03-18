import { lazy } from 'react'
import SearchIcon from 'mdi-react/SearchIcon'
import AboutIcon from 'mdi-react/AboutIcon'
import TermsIcon from 'mdi-react/ContractIcon'
import PrivacyIcon from 'mdi-react/LockCheckIcon'
import UsersIcon from 'mdi-react/AccountMultipleIcon'
import DisclaimerIcon from 'mdi-react/WarningIcon'
import LoginIcon from 'mdi-react/LoginIcon'
import Transition from '../../components/page-transition'
import getUriState from '../../lib/fns/get-uri-state'
import HomeIcon from 'mdi-react/HomeIcon'
import UsageIcon from 'mdi-react/ChartBoxIcon'
import CollectionsIcon from 'mdi-react/PackageVariantIcon'
// import CuratorToolsIcon from 'mdi-react/BookshelfIcon'

const HomePage = lazy(() => import('../../pages/home'))
const RecordPage = lazy(() => import('../../pages/record'))
const RecordsPage = lazy(() => import('../../pages/records'))
const UsersPage = lazy(() => import('../../pages/users'))
const LoginPage = lazy(() => import('../../pages/login'))
const TermsOfServicePage = lazy(() => import('../../pages/terms-of-service'))
const TermsOfUsePage = lazy(() => import('../../pages/terms-of-use'))
const AboutPage = lazy(() => import('../../pages/about'))
const PrivacyPolicyPage = lazy(() => import('../../pages/privacy-policy'))
const DisclaimerPage = lazy(() => import('../../pages/disclaimer'))
const AccessPage = lazy(() => import('../../pages/access'))
const UsageReportsPage = lazy(() => import('../../pages/usage'))
const DataListsPage = lazy(() => import('../../pages/data-lists'))

export default [
  {
    label: 'Home',
    to: '/',
    exact: true,
    Icon: HomeIcon,
    render: () => (
      <Transition>
        <HomePage />
      </Transition>
    ),
  },

  {
    label: 'Search SAEON data',
    Icon: SearchIcon,
    to: '/records',
    exact: true,
    render: () => {
      return (
        <Transition tKey="records">
          <RecordsPage {...getUriState()} />
        </Transition>
      )
    },
  },
  {
    label: 'Usage reports',
    to: '/usage',
    exact: true,
    Icon: UsageIcon,
    requiredPermission: '/usage',
    render: () => (
      <Transition>
        <UsageReportsPage />
      </Transition>
    ),
  },
  {
    label: 'Data lists',
    to: '/data-lists',
    exact: true,
    Icon: CollectionsIcon,
    requiredPermission: '/data-lists',
    render: () => (
      <Transition>
        <DataListsPage />
      </Transition>
    ),
  },
  {
    label: 'Record',
    Icon: undefined,
    to: '/records/:id+',
    exact: true,
    excludeFromNav: true,
    render: props => (
      <Transition tKey="record">
        <RecordPage id={props.match.params.id} {...props} />
      </Transition>
    ),
  },
  {
    label: 'About the data portal',
    Icon: AboutIcon,
    to: '/about',
    exact: true,
    excludeFromNav: true,
    includeInFooter: true,
    render: () => (
      <Transition>
        <AboutPage />
      </Transition>
    ),
  },
  {
    label: 'Privacy policy',
    Icon: PrivacyIcon,
    exact: true,
    render: () => (
      <Transition>
        <PrivacyPolicyPage />
      </Transition>
    ),
    to: '/privacy-policy',
    excludeFromNav: true,
    includeInFooter: true,
  },
  {
    label: 'Terms of service',
    Icon: TermsIcon,
    to: '/terms-of-service',
    exact: true,
    render: () => (
      <Transition>
        <TermsOfServicePage />
      </Transition>
    ),
    excludeFromNav: true,
    includeInFooter: true,
  },
  {
    label: 'Terms of use',
    Icon: TermsIcon,
    exact: true,
    render: () => (
      <Transition>
        <TermsOfUsePage />
      </Transition>
    ),
    to: '/terms-of-use',
    excludeFromNav: true,
    includeInFooter: true,
  },
  {
    label: 'Disclaimer',
    Icon: DisclaimerIcon,
    to: '/disclaimer',
    exact: true,
    render: () => (
      <Transition>
        <DisclaimerPage />
      </Transition>
    ),
    excludeFromNav: true,
    includeInFooter: true,
  },
  {
    label: 'Login',
    Icon: LoginIcon,
    excludeFromNav: true,
    to: '/login',
    exact: true,
    render: () => (
      <Transition>
        <LoginPage />
      </Transition>
    ),
  },
  {
    label: 'Access',
    Icon: UsersIcon,
    to: '/access',
    requiredPermission: '/access',
    exact: true,
    render: props => (
      <Transition tKey={'access'}>
        <AccessPage {...props} />
      </Transition>
    ),
  },
  {
    label: 'Users',
    Icon: UsersIcon,
    to: '/users',
    excludeFromNav: true,
    exact: true,
    render: props => (
      <Transition tKey={'users'}>
        <UsersPage {...props} />
      </Transition>
    ),
  },
]
