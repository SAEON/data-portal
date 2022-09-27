import { lazy } from 'react'
import SearchIcon from 'mdi-react/SearchIcon'
import AboutIcon from 'mdi-react/AboutIcon'
import TermsIcon from 'mdi-react/ContractIcon'
import PrivacyIcon from 'mdi-react/LockCheckIcon'
import DisclaimerIcon from 'mdi-react/AlertIcon'
import Transition from '../../components/page-transition'
import getUriState from '../../lib/fns/get-uri-state'
import { Navigate } from 'react-router-dom'

const RecordPage = lazy(() => import('../../modules/record'))
const RecordsPage = lazy(() => import('../../modules/records'))
const TermsOfUsePage = lazy(() => import('../../modules/terms-of-use'))
const AboutPage = lazy(() => import('../../modules/about'))
const PrivacyPolicyPage = lazy(() => import('../../modules/privacy-policy'))
const DisclaimerPage = lazy(() => import('../../modules/disclaimer'))

const getPath = (contentBase, p) => `${contentBase}${p}`

export default ({ contentBase }) => {
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
      label: 'Record',
      Icon: undefined,
      to: getPath(contentBase, '/records/:id'),
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
    },
    {
      label: 'Disclaimer',
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
      label: 'Render',
      to: getPath(contentBase, '/element'),
      element: ({ location: { pathname, search } }) => {
        return <Navigate to={`${pathname.replace('/element', '')}${search}`} />
      },
      excludeFromNav: true,
    },
  ]
}
