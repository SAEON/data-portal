import CircularProgress from '@material-ui/core/CircularProgress'
import useTheme from '@material-ui/core/styles/useTheme'
import { context as authContext } from '../../../../contexts/authentication'
import Login from './_login'
import Logout from './_logout'
import UserAvatar from './_user-avatar'
import Hidden from '@material-ui/core/Hidden'

export default ({ style }) => {
  const theme = useTheme()

  return (
    <div style={style}>
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
                <Hidden xsDown>
                  <UserAvatar style={{ display: 'flex' }} userInfo={userInfo} />
                </Hidden>
              </div>
            )
          }

          return <Login />
        }}
      </authContext.Consumer>
    </div>
  )
}
