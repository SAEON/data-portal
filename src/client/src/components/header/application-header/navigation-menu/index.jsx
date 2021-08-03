import { useState, useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuIcon from 'mdi-react/MenuIcon'
import NavItem from './_nav-item'
import { context as authorizationContext } from '../../../../contexts/authorization'

export default ({ routes }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { isAuthorized } = useContext(authorizationContext)

  return (
    <>
      <IconButton
        aria-label="Show navigation menu"
        onClick={e => setAnchorEl(anchorEl ? null : e.currentTarget)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>

      <Menu
        id="site-navigation-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {routes
          .filter(({ authorization = false, excludeFromNav = false }) => {
            if (excludeFromNav) {
              return false
            }
            return authorization ? isAuthorized(authorization) : true
          })
          .map(({ label, Icon, to }) => {
            if (!Icon) {
              throw new Error('Cannot draw menu item without an Icon')
            }

            return (
              <NavItem
                onClick={() => setAnchorEl(null)}
                key={label}
                Icon={Icon}
                label={label}
                to={to}
              />
            )
          })}
      </Menu>
    </>
  )
}
