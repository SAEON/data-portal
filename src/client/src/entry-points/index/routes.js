import { lazy } from 'react'
import SearchIcon from 'mdi-react/SearchIcon'
import AboutIcon from 'mdi-react/AboutIcon'
import TermsIcon from 'mdi-react/ContractIcon'
import PrivacyIcon from 'mdi-react/LockCheckIcon'
import ContactIcon from 'mdi-react/ContactMailIcon'
import DatabookIcon from 'mdi-react/DatabaseCogIcon'
import UsersIcon from 'mdi-react/AccountMultipleIcon'
import DisclaimerIcon from 'mdi-react/WarningIcon'
import LoginIcon from 'mdi-react/LoginIcon'
import Transition from '../../components/page-transition'
import getUriState from '../../lib/fns/get-uri-state'
import HomeIcon from 'mdi-react/HomeIcon'
import { Redirect } from 'react-router-dom'

const HomePage = lazy(() => import('../../pages/home'))
const RecordPage = lazy(() => import('../../pages/record'))
const RecordsPage = lazy(() => import('../../pages/records'))
const DatabookPage = lazy(() => import('../../pages/databook'))
const DatabooksPage = lazy(() => import('../../pages/databooks'))
const UsersPage = lazy(() => import('../../pages/users'))
const DashboardPage = lazy(() => import('../../pages/dashboard'))
const ChartPage = lazy(() => import('../../pages/chart'))
const LoginPage = lazy(() => import('../../pages/login'))
const TermsOfServicePage = lazy(() => import('../../pages/terms-of-service'))
const TermsOfUsePage = lazy(() => import('../../pages/terms-of-use'))
const AboutPage = lazy(() => import('../../pages/about'))
const PrivacyPolicyPage = lazy(() => import('../../pages/privacy-policy'))
const ContactPage = lazy(() => import('../../pages/contact'))
const DisclaimerPage = lazy(() => import('../../pages/disclaimer'))

export default [
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
    label: 'Databooks',
    to: '/databooks',
    exact: true,
    Icon: DatabookIcon,
    render: props => (
      <Transition tKey={'databooks'}>
        <DatabooksPage {...props} />
      </Transition>
    ),
    authorization: ['admin', 'datascientist'],
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
    label: 'About',
    Icon: AboutIcon,
    to: '/about',
    exact: true,
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
    label: 'Render',
    to: '/render',
    exact: false,
    render: ({ location: { pathname } }) => {
      return <Redirect to={pathname.replace('/render', '')} />
    },
    excludeFromNav: true,
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
    label: 'Contact us',
    Icon: ContactIcon,
    to: '/contact',
    exact: true,
    render: () => (
      <Transition>
        <ContactPage />
      </Transition>
    ),
  },
  {
    label: 'Databook',
    to: '/databooks/:id',
    exact: true,
    render: props => (
      <Transition tKey={'databook'}>
        <DatabookPage id={props.match.params.id} {...props} />
      </Transition>
    ),
    excludeFromNav: true,
  },
  {
    label: 'Dashboard',
    to: '/dashboards/:id',
    excludeFromNav: true,
    exact: true,
    render: props => (
      <Transition tKey={'dashboard'}>
        <DashboardPage id={props.match.params.id} {...props} />
      </Transition>
    ),
  },
  {
    label: 'Chart',
    to: '/charts/:id',
    exact: true,
    excludeFromNav: true,
    render: props => (
      <Transition tKey={'chart'}>
        <ChartPage id={props.match.params.id} {...props} />
      </Transition>
    ),
  },
  {
    label: 'Users',
    Icon: UsersIcon,
    to: '/users',
    authorization: ['admin'],
    exact: true,
    render: props => (
      <Transition tKey={'users'}>
        <UsersPage {...props} />
      </Transition>
    ),
  },
]
