import { lazy, Suspense } from 'react'
import UsersIcon from 'mdi-react/AccountMultipleIcon'
import LoginIcon from 'mdi-react/LoginIcon'
import HomeIcon from 'mdi-react/HomeIcon'
import DataSubmissionsIcon from 'mdi-react/DatabaseIcon'
import Auth from '../../components/auth'
import Fade from '@material-ui/core/Fade'
import Loading from '../../components/loading'

const HomePage = lazy(() => import('../../pages/home-curation-tools'))
const UsersPage = lazy(() => import('../../pages/users'))
const LoginPage = lazy(() => import('../../pages/login'))
const AccessPage = lazy(() => import('../../pages/access'))
const MetadataPage = lazy(() => import('../../pages/metadata'))

const Transition = ({ children, tKey }) => {
  window.scrollTo(0, 0)

  return (
    <Fade key={tKey} in={true}>
      <div
        style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </Fade>
  )
}

const getPath = (contentBase, p) => `${contentBase}${p}`

export default ({ contentBase = '' }) => {
  return [
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
      label: 'Metadata',
      to: getPath(contentBase, '/metadata'),
      exact: true,
      Icon: DataSubmissionsIcon,
      render: () => (
        <Auth requiredPermission="/curator-tools">
          <Transition>
            <MetadataPage />
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
