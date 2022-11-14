import { forwardRef } from 'react'
import Link from '@mui/material/Link'
import { PUBLIC_HTTP_ADDRESS } from '../../../../../config'
import LogoutIcon from 'mdi-react/LogoutVariantIcon'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export default forwardRef((props, ref) => {
  return (
    <MenuItem
      ref={ref}
      component={Link}
      href={`${PUBLIC_HTTP_ADDRESS}/logout?redirect=${window.location.href}`}
    >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText>Log out</ListItemText>
    </MenuItem>
  )
})
