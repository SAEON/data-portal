import { useState, useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuIcon from 'mdi-react/MenuIcon'
import navItems from './_nav-items'
import NavItem from './_nav-item'
import { context as authorizationContext } from '../../../contexts/authorization'

export default () => {
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
        {navItems
          .filter(({ authorization = false }) =>
            authorization ? isAuthorized(authorization) : true
          )
          .map(({ label, Icon, to }) => (
            <NavItem
              onClick={() => setAnchorEl(null)}
              key={label}
              Icon={Icon}
              label={label}
              to={to}
            />
          ))}
      </Menu>
    </>
  )
}
