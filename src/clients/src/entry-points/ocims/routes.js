import { lazy, Suspense } from 'react'
import LoginIcon from 'mdi-react/LoginIcon'
import HomeIcon from 'mdi-react/HomeIcon'
import Fade from '@mui/material/Fade'
import Loading from '../../components/loading'

const HomePage = () => <div>home</div>
const LoginPage = lazy(() => import('../../pages/login'))

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
  ]
}
