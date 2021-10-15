import { useContext } from 'react'
import { context as configContext } from '../../../../config'
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import LoginIcon from 'mdi-react/LoginVariantIcon'
import Tooltip from '@mui/material/Tooltip'

export default props => {
  const { contentBase } = useContext(configContext)

  return (
    <Tooltip title="Log in">
      <span>
        <IconButton
          component={Link}
          to={`${`${contentBase}/login`.replace('//', '/')}?redirect=${window.location.href}`}
          {...props}
          size="large"
        >
          <LoginIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
