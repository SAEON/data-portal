import { useContext } from 'react'
import { context as configContext } from '../../../../config'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { LoginIcon } from '../../../icons'

export default props => {
  const { contentBase } = useContext(configContext)

  return (
    <Button
      component={Link}
      to={`${`${contentBase}/login`.replace('//', '/')}?redirect=${window.location.href}`}
      size="small"
      color="primary"
      endIcon={<LoginIcon size={20} />}
      sx={{ lineHeight: '100%' }}
      {...props}
    >
      Sign up / Log in
    </Button>
  )
}
