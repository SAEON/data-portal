import { lazy } from 'react'
import { PUBLIC_GQL_ADDRESS } from '../../config'
import Transition from '../../components/page-transition'
import getUriState from '../../lib/fns/get-uri-state'

import {
  Magnify as SearchIcon,
  Information as AboutIcon,
  FileSign as TermsIcon,
  LockCheck as PrivacyIcon,
  Alert as DisclaimerIcon,
  Home as HomeIcon,
  Api as ApiIcon,
  Github as GithubIcon,
  License as LicenseIcon,
} from '../../components/icons'

const HomePage = lazy(() => import('../../modules/home'))
const RecordPage = lazy(() => import('../../modules/record'))
const RecordsPage = lazy(() => import('../../modules/records'))
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
      element: () => {
        return (
          <Transition tKey="records">
            <RecordsPage {...getUriState()} />
          </Transition>
        )
      },
    },
    {
      label: 'Home',
      to: getPath(contentBase, '/'),
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
      to: getPath(contentBase, '/records/*'),
      excludeFromNav: true,
      element: () => (
        <Transition tKey="record">
          <RecordPage />
        </Transition>
      ),
    },

    {
      label: 'About',
      Icon: AboutIcon,
      includeInFooter: true,
      to: getPath(contentBase, '/about'),
      element: () => (
        <Transition>
          <AboutPage />
        </Transition>
      ),
    },
    {
      label: 'Privacy policy',
      Icon: PrivacyIcon,
      element: () => (
        <Transition>
          <PrivacyPolicyPage />
        </Transition>
      ),
      to: getPath(contentBase, '/privacy-policy'),
      excludeFromNav: true,
      includeInFooter: true,
      group: 'legal',
    },
    {
      label: 'Terms of use',
      Icon: TermsIcon,
      element: () => (
        <Transition>
          <TermsOfUsePage />
        </Transition>
      ),
      to: getPath(contentBase, '/terms-of-use'),
      excludeFromNav: true,
      includeInFooter: true,
      group: 'legal',
    },
    {
      label: 'Disclaimer',
      group: 'legal',
      Icon: DisclaimerIcon,
      to: getPath(contentBase, '/disclaimer'),
      element: () => (
        <Transition>
          <DisclaimerPage />
        </Transition>
      ),
      excludeFromNav: true,
      includeInFooter: true,
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
}
