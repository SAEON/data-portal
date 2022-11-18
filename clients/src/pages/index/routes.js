import { lazy } from 'react'
import Transition from '../../components/page-transition'
import { PUBLIC_GQL_ADDRESS } from '../../config'
import getUriState from '../../lib/fns/get-uri-state'
import {
  Magnify as SearchIcon,
  Login as LoginIcon,
  Information as AboutIcon,
  FileSign as TermsIcon,
  LockCheck as PrivacyIcon,
  AccountMultiple as UsersIcon,
  Alert as DisclaimerIcon,
  Home as HomeIcon,
  ChartBox as UsageIcon,
  Package as CollectionsIcon,
  Api as ApiIcon,
  Github as GithubIcon,
  License as LicenseIcon,
} from '../../components/icons'

const HomePage = lazy(() => import('../../modules/home'))
const RecordPage = lazy(() => import('../../modules/record'))
const RecordsPage = lazy(() => import('../../modules/records'))
const UsersPage = lazy(() => import('../../modules/users'))
const LoginPage = lazy(() => import('../../modules/login'))
const TermsOfUsePage = lazy(() => import('../../modules/terms-of-use'))
const AboutPage = lazy(() => import('../../modules/about'))
const PrivacyPolicyPage = lazy(() => import('../../modules/privacy-policy'))
const DisclaimerPage = lazy(() => import('../../modules/disclaimer'))
const AccessPage = lazy(() => import('../../modules/access'))
const UsageReportsPage = lazy(() => import('../../modules/usage'))
const DataListsPage = lazy(() => import('../../modules/data-lists'))
const LicensePage = lazy(() => import('../../modules/license'))

export default [
  {
    label: 'Home',
    to: '/',
    includeInFooter: true,
    Icon: HomeIcon,
    element: () => (
      <Transition>
        <HomePage />
      </Transition>
    ),
  },
  {
    label: 'Record',
    Icon: undefined,
    to: '/records/*',
    excludeFromNav: true,
    element: () => {
      return (
        <Transition tKey="record">
          <RecordPage />
        </Transition>
      )
    },
  },
  {
    label: 'Records',
    Icon: SearchIcon,
    includeInFooter: true,
    breadcrumbsIcon: false,
    to: '/records',
    element: () => {
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
    includeInFooter: true,
    Icon: UsageIcon,
    requiredPermission: '/usage',
    element: () => (
      <Transition>
        <UsageReportsPage />
      </Transition>
    ),
  },
  {
    label: 'Data lists',
    to: '/data-lists',
    includeInFooter: true,
    Icon: CollectionsIcon,
    requiredPermission: '/data-lists',
    element: () => (
      <Transition>
        <DataListsPage />
      </Transition>
    ),
  },
  {
    label: 'About the data portal',
    Icon: AboutIcon,
    to: '/about',
    excludeFromNav: true,
    includeInFooter: true,
    element: () => (
      <Transition>
        <AboutPage />
      </Transition>
    ),
  },
  {
    label: 'Privacy policy',
    Icon: PrivacyIcon,
    group: 'legal',
    element: () => (
      <Transition>
        <PrivacyPolicyPage />
      </Transition>
    ),
    to: '/privacy-policy',
    excludeFromNav: true,
    includeInFooter: true,
  },
  {
    label: 'Terms of use',
    Icon: TermsIcon,
    group: 'legal',
    element: () => (
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
    group: 'legal',
    to: '/disclaimer',
    element: () => (
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
    includeInFooter: true,
    element: () => (
      <Transition>
        <LoginPage />
      </Transition>
    ),
  },
  {
    label: 'Access',
    Icon: UsersIcon,
    to: '/access',
    includeInFooter: true,
    requiredPermission: '/access',
    element: props => (
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
    element: props => (
      <Transition tKey={'users'}>
        <UsersPage {...props} />
      </Transition>
    ),
  },
  {
    label: 'GraphQL Playground',
    Icon: ApiIcon,
    href: PUBLIC_GQL_ADDRESS,
    excludeFromNav: true,
    includeInFooter: true,
    to: '/no-route', // Hack - the to property is still required
  },
  {
    group: 'source code',
    label: 'Source code',
    Icon: GithubIcon,
    href: 'https://github.com/SAEON/data-portal',
    excludeFromNav: true,
    includeInFooter: true,
    to: '/no-route', // Hack - the to property is still required
  },
  {
    group: 'source code',
    label: 'License (MIT)',
    Icon: LicenseIcon,
    excludeFromNav: true,
    includeInFooter: true,
    to: '/license',
    element: () => (
      <Transition>
        <LicensePage />
      </Transition>
    ),
  },
]
