import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import Tooltip from '@material-ui/core/Tooltip'
import UserIcon from 'mdi-react/AccountIcon'
import Logout from './_logout'

export default props => {
  const [anchor, setAnchor] = useState(null)

  const onClose = () => setAnchor(null)
  const onOpen = e => setAnchor(e.currentTarget)

  return (
    <div>
      {/* MENU TRIGGER */}
      <Tooltip title={`Hi ${props.user.name || props.user.emailAddress}`}>
        <IconButton onClick={onOpen}>
          <UserIcon />
        </IconButton>
      </Tooltip>

      {/* MENU */}
      <Menu
        disableScrollLock
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={onClose}
      >
        <Logout {...props} />
      </Menu>
    </div>
  )
}
