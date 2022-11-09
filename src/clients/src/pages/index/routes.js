import { lazy } from 'react'
import { styled } from '@mui/material/styles'
import Transition from '../../components/page-transition'
import { PUBLIC_GQL_ADDRESS } from '../../config'
import getUriState from '../../lib/fns/get-uri-state'

import SearchIcon from 'mdi-react/SearchIcon'
import AboutIcon from 'mdi-react/AboutIcon'
import TermsIcon from 'mdi-react/ContractIcon'
import PrivacyIcon from 'mdi-react/LockCheckIcon'
import UsersIcon from 'mdi-react/AccountMultipleIcon'
import DisclaimerIcon from 'mdi-react/AlertIcon'
import LoginIcon from 'mdi-react/LoginIcon'
import HomeIcon from 'mdi-react/HomeIcon'
import UsageIcon from 'mdi-react/ChartBoxIcon'
import CollectionsIcon from 'mdi-react/PackageVariantIcon'
import GithubIcon_ from 'mdi-react/GithubIcon'
import ApiIcon_ from 'mdi-react/ApiIcon'
import LicenseIcon_ from 'mdi-react/LicenseIcon'

const ApiIcon = styled(ApiIcon_)({})
const GithubIcon = styled(GithubIcon_)({})
const LicenseIcon = styled(LicenseIcon_)({})

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
