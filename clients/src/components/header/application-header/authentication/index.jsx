import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { context as authContext } from '../../../../contexts/authentication'
import Login from './_login'
import UserMenu from './user-menu'
import Divider from '@mui/material/Divider'
import { Div } from '../../../html-tags'

export default () => {
  const { pathname } = useLocation()
  const isLoginPage = useMemo(() => pathname.includes('login'), [pathname])

  return (
    <>
      <Divider flexItem orientation="vertical" sx={{ mr: 1 }} />
      <Div sx={{ mr: 1 }}>
        <authContext.Consumer>
          {({ user, authenticating }) => {
            if (authenticating) {
              return <CircularProgress color="inherit" thickness={2} size={18} />
            }

            return (
              <>
                {user && <UserMenu user={user} />}
                {!user && <Login disabled={isLoginPage} />}
              </>
            )
          }}
        </authContext.Consumer>
      </Div>
    </>
  )
}
