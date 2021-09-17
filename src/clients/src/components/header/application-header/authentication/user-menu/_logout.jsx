import { forwardRef } from 'react'
import Link from '@material-ui/core/Link'
import { API_PUBLIC_ADDRESS } from '../../../../../config'
import LogoutIcon from 'mdi-react/LogoutVariantIcon'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

export default forwardRef((props, ref) => {
  return (
    <MenuItem
      ref={ref}
      component={Link}
      href={`${API_PUBLIC_ADDRESS}/logout?redirect=${window.location.href}`}
    >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText>Log out</ListItemText>
    </MenuItem>
  )
})
