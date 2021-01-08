import { CircularProgress } from '@material-ui/core'
import { AuthContext } from '../../../contexts/authentication'
import Login from './_login'
import Logout from './_logout'

export default () => {
  return (
    <AuthContext.Consumer>
      {({ userInfo, authenticating }) => {
        if (authenticating) {
          return <CircularProgress color="inherit" thickness={2} size={18} />
        } else {
          if (userInfo) {
            return <Logout userInfo={userInfo} />
          } else {
            return <Login />
          }
        }
      }}
    </AuthContext.Consumer>
  )
}
