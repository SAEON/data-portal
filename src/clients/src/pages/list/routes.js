import { lazy } from 'react'
import { styled } from '@mui/material/styles'
import { PUBLIC_GQL_ADDRESS } from '../../config'

import SearchIcon from 'mdi-react/SearchIcon'
import AboutIcon from 'mdi-react/AboutIcon'
import TermsIcon from 'mdi-react/ContractIcon'
import PrivacyIcon from 'mdi-react/LockCheckIcon'
import DisclaimerIcon from 'mdi-react/AlertIcon'
import Transition from '../../components/page-transition'
import getUriState from '../../lib/fns/get-uri-state'
import HomeIcon from 'mdi-react/HomeIcon'
import GithubIcon_ from 'mdi-react/GithubIcon'
import ApiIcon_ from 'mdi-react/ApiIcon'
import LicenseIcon_ from 'mdi-react/LicenseIcon'

const ApiIcon = styled(ApiIcon_)({})
const GithubIcon = styled(GithubIcon_)({})
const LicenseIcon = styled(LicenseIcon_)({})

const HomePage = lazy(() => import('../../modules/home'))
const RecordPage = lazy(() => import('../../modules/record'))
const RecordsPage = lazy(() => import('../../modules/records'))
const TermsOfServicePage = lazy(() => import('../../modules/terms-of-service'))
const TermsOfUsePage = lazy(() => import('../../modules/terms-of-use'))
const AboutPage = lazy(() => import('../../modules/about'))
const PrivacyPolicyPage = lazy(() => import('../../modules/privacy-policy'))
const DisclaimerPage = lazy(() => import('../../modules/disclaimer'))
const LicensePage = lazy(() => import('../../modules/license'))

const getPath = (contentBase, p) => `${contentBase}${p}`

export default ({ contentBase = '' }) => {
  return [
    {
      label: 'Search SAEON data',
      Icon: SearchIcon,
      to: getPath(contentBase, '/records'),
      exact: true,
      render: () => {
        return (
          <Transition tKey="records">
            <RecordsPage {...getUriState()} />
          </Transition>
        )
      }
    },
    {
      label: 'Home',
      to: getPath(contentBase, '/'),
      exact: true,
      Icon: HomeIcon,
      render: () => (
        <Transition>
          <HomePage />
        </Transition>
      )
    },
    {
      label: 'Record',
      Icon: undefined,
      to: getPath(contentBase, '/records/:id+'),
      exact: true,
      excludeFromNav: true,
      render: props => (
        <Transition tKey="record">
          <RecordPage id={props.match.params.id} {...props} />
        </Transition>
      )
    },

    {
      label: 'About',
      Icon: AboutIcon,
      includeInFooter: true,
      to: getPath(contentBase, '/about'),
      exact: true,
      render: () => (
        <Transition>
          <AboutPage />
        </Transition>
      )
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
      to: getPath(contentBase, '/privacy-policy'),
      excludeFromNav: true,
      includeInFooter: true,
      group: 'legal'
    },
    {
      label: 'Terms of service',
      Icon: TermsIcon,
      to: getPath(contentBase, '/terms-of-service'),
      exact: true,
      render: () => (
        <Transition>
          <TermsOfServicePage />
        </Transition>
      ),
      excludeFromNav: true,
      includeInFooter: true,
      group: 'legal'
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
      to: getPath(contentBase, '/terms-of-use'),
      excludeFromNav: true,
      includeInFooter: true,
      group: 'legal'
    },
    {
      label: 'Disclaimer',
      group: 'legal',
      Icon: DisclaimerIcon,
      to: getPath(contentBase, '/disclaimer'),
      exact: true,
      render: () => (
        <Transition>
          <DisclaimerPage />
        </Transition>
      ),
      excludeFromNav: true,
      includeInFooter: true
    },
    {
      label: 'GraphQL Playground',
      Icon: ApiIcon,
      href: PUBLIC_GQL_ADDRESS,
      excludeFromNav: true,
      includeInFooter: true,
      to: '/no-route' // Hack - the to property is still required
    },
    {
      group: 'source code',
      label: 'Source code',
      Icon: GithubIcon,
      href: 'https://github.com/SAEON/data-portal',
      excludeFromNav: true,
      includeInFooter: true,
      to: '/no-route' // Hack - the to property is still required
    },
    {
      group: 'source code',
      label: 'License (MIT)',
      Icon: LicenseIcon,
      excludeFromNav: true,
      includeInFooter: true,
      to: '/license',
      render: () => (
        <Transition>
          <LicensePage />
        </Transition>
      )
    }
  ]
}
