import { lazy } from 'react'
import SearchIcon from 'mdi-react/SearchIcon'
import AboutIcon from 'mdi-react/AboutIcon'
import TermsIcon from 'mdi-react/ContractIcon'
import PrivacyIcon from 'mdi-react/LockCheckIcon'
import DisclaimerIcon from 'mdi-react/WarningIcon'
import Transition from '../../components/page-transition'
import getUriState from '../../lib/fns/get-uri-state'
import { Redirect } from 'react-router-dom'

const RecordPage = lazy(() => import('../../pages/record'))
const RecordsPage = lazy(() => import('../../pages/records'))
const DashboardPage = lazy(() => import('../../pages/dashboard'))
const ChartPage = lazy(() => import('../../pages/chart'))
const TermsOfServicePage = lazy(() => import('../../pages/terms-of-service'))
const TermsOfUsePage = lazy(() => import('../../pages/terms-of-use'))
const AboutPage = lazy(() => import('../../pages/about'))
const PrivacyPolicyPage = lazy(() => import('../../pages/privacy-policy'))
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
    render: ({ location: { pathname, search } }) => {
      return <Redirect to={`${pathname.replace('/render', '')}${search}`} />
    },
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
]
