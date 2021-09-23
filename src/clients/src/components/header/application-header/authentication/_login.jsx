import { useContext } from 'react'
import { context as configContext } from '../../../../config'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import LoginIcon from 'mdi-react/LoginVariantIcon'
import Tooltip from '@material-ui/core/Tooltip'

export default props => {
  const { contentBase } = useContext(configContext)

  return (
    <Tooltip title="Log in">
      <span>
        <IconButton
          component={Link}
          to={`${`${contentBase}/login`.replace('//', '/')}?redirect=${window.location.href}`}
          {...props}
        >
          <LoginIcon />
        </IconButton>
      </span>
    </Tooltip>
  )
}
