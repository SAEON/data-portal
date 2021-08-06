import Link from '@material-ui/core/Link'
import { API_PUBLIC_ADDRESS } from '../../../../../config'
import LogoutIcon from 'mdi-react/LogoutVariantIcon'
import Tooltip from '@material-ui/core/Tooltip'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

export default ({ user }) => {
  return (
    <Tooltip title={`Log out ${user.name || user.emailAddress}`}>
      <MenuItem
        component={Link}
        href={`${API_PUBLIC_ADDRESS}/logout?redirect=${window.location.href}`}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </MenuItem>
    </Tooltip>
  )
}
