import { lazy } from 'react'
import UsersIcon from 'mdi-react/AccountMultipleIcon'
import LoginIcon from 'mdi-react/LoginIcon'
import Transition from '../../components/page-transition'
import HomeIcon from 'mdi-react/HomeIcon'

const HomePage = lazy(() => import('../../pages/home-curation-tools'))
const UsersPage = lazy(() => import('../../pages/users'))
const LoginPage = lazy(() => import('../../pages/login'))
const AccessPage = lazy(() => import('../../pages/access'))

const getPath = (contentBase, p) => `${contentBase}${p}`

export default ({ contentBase = '' }) => {
  return [
    {
      label: 'Home',
      to: getPath(contentBase, '/'),
      exact: true,
      Icon: HomeIcon,
      render: () => (
        <Transition>
          <HomePage />
        </Transition>
      ),
    },
    {
      label: 'Login',
      Icon: LoginIcon,
      excludeFromNav: true,
      to: getPath(contentBase, '/login'),
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
      to: getPath(contentBase, '/access'),
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
      to: getPath(contentBase, '/users'),
      excludeFromNav: true,
      exact: true,
      render: props => (
        <Transition tKey={'users'}>
          <UsersPage {...props} />
        </Transition>
      ),
    },
  ]
}
