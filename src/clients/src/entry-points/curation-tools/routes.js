import { lazy } from 'react'
import UsersIcon from 'mdi-react/AccountMultipleIcon'
import LoginIcon from 'mdi-react/LoginIcon'
import Transition from '../../components/page-transition'
import HomeIcon from 'mdi-react/HomeIcon'
import DataSubmissionsIcon from 'mdi-react/DatabaseArrowUpIcon'
import Auth from '../../components/auth'

const HomePage = lazy(() => import('../../pages/home-curation-tools'))
const UsersPage = lazy(() => import('../../pages/users'))
const LoginPage = lazy(() => import('../../pages/login'))
const AccessPage = lazy(() => import('../../pages/access'))
const DataSubmissionsPage = lazy(() => import('../../pages/data-submissions'))

const getPath = (contentBase, p) => `${contentBase}${p}`

export default ({ contentBase = '' }) => {
  return [
    {
      label: 'Data submissions',
      to: getPath(contentBase, '/data-submissions'),
      exact: true,
      Icon: DataSubmissionsIcon,
      render: () => (
        <Auth requiredPermission="/curator-tools">
          <Transition>
            <DataSubmissionsPage />
          </Transition>
        </Auth>
      ),
    },
    {
      label: 'Home',
      to: getPath(contentBase, '/'),
      exact: true,
      Icon: HomeIcon,
      render: () => (
        <Auth requiredPermission="/curator-tools">
          <Transition>
            <HomePage />
          </Transition>
        </Auth>
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
