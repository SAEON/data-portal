import SearchIcon from 'mdi-react/SearchIcon'
import AboutIcon from 'mdi-react/AboutIcon'
import TermsIcon from 'mdi-react/ContractIcon'
import PrivacyIcon from 'mdi-react/LockCheckIcon'
import ContactIcon from 'mdi-react/ContactMailIcon'
import DatabookIcon from 'mdi-react/DatabaseCogIcon'
import UsersIcon from 'mdi-react/AccountMultipleIcon'
import DisclaimerIcon from 'mdi-react/WarningIcon'

export default [
  {
    label: 'Search our data',
    Icon: SearchIcon,
    to: '/records',
  },
  {
    label: 'About',
    Icon: AboutIcon,
    to: '/about',
  },
  {
    label: 'Privacy policy',
    Icon: PrivacyIcon,
    to: '/privacy-policy',
  },
  {
    label: 'Terms of service',
    Icon: TermsIcon,
    to: '/terms-of-service',
  },
  {
    label: 'Terms of use',
    Icon: TermsIcon,
    to: '/terms-of-use',
  },
  {
    label: 'Disclaimer',
    Icon: DisclaimerIcon,
    to: '/disclaimer',
  },
  {
    label: 'Contact us',
    Icon: ContactIcon,
    to: '/contact',
  },
  {
    label: 'Databooks',
    Icon: DatabookIcon,
    to: '/databooks',
    authorization: ['admin', 'datascientist'],
  },
  { label: 'Users', Icon: UsersIcon, to: '/users', authorization: ['admin'] },
]
