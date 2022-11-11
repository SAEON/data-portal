import { useContext } from 'react'
import { context as configContext } from '../../../../config'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { LoginIcon } from '../../../icons'
import useMediaQuery from '@mui/material/useMediaQuery'
import Typography from '@mui/material/Typography'

export default props => {
  const { contentBase } = useContext(configContext)
  const smUp = useMediaQuery(theme => theme.breakpoints.up('sm'))

  return (
    <Button
      component={Link}
      to={`${`${contentBase}/login`.replace('//', '/')}?redirect=${window.location.href}`}
      size="small"
      color="primary"
      endIcon={<LoginIcon fontSize="small" />}
      sx={theme => ({
        lineHeight: '100%',
        [theme.breakpoints.down('sm')]: {
          minWidth: 'unset',
          '& .MuiButton-endIcon': {
            ml: '1px !important',
          },
        },
      })}
      {...props}
    >
      <Typography variant="overline">{smUp && 'Sign up / Log in'}</Typography>
    </Button>
  )
}
