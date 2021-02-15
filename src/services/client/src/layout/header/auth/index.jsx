import CircularProgress from '@material-ui/core/CircularProgress'
import useTheme from '@material-ui/core/styles/useTheme'
import { isMobile } from 'react-device-detect'
import { context as authContext } from '../../../contexts/authentication'
import Login from './_login'
import Logout from './_logout'
import UserAvatar from './_user-avatar'

export default () => {
  const theme = useTheme()

  return (
    <authContext.Consumer>
      {({ userInfo, authenticating }) => {
        if (authenticating) {
          return <CircularProgress color="inherit" thickness={2} size={18} />
        }

        if (userInfo) {
          return (
            <div style={{ display: 'flex' }}>
              <Logout
                style={{ display: 'flex', alignItems: 'center', marginRight: theme.spacing(1) }}
                userInfo={userInfo}
              />
              {!isMobile && <UserAvatar style={{ display: 'flex' }} userInfo={userInfo} />}
            </div>
          )
        }

        return <Login />
      }}
    </authContext.Consumer>
  )
}
