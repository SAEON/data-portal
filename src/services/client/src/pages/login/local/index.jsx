import { useState, useEffect } from 'react'
import { Fade, Typography } from '@material-ui/core'
import Signup from './_sign-up'
import Login from './_login'
import getUriState from '../../../lib/fns/get-uri-state'
import { useSnackbar } from 'notistack'

export default () => {
  const [isNewUser, setIsNewUser] = useState(false)
  const { error, success } = getUriState()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (error) {
      enqueueSnackbar(decodeURIComponent(error), { variant: 'error' })
    }
    if (success) {
      enqueueSnackbar(decodeURIComponent(success), { variant: 'success' })
    }
  }, [error, success, enqueueSnackbar])

  return (
    <>
      <Fade key="signup" in={!isNewUser}>
        <div>{!isNewUser && <Login />}</div>
      </Fade>

      <Fade key="login" in={isNewUser}>
        <div>{isNewUser && <Signup />}</div>
      </Fade>

      <div style={{ textAlign: 'center' }}>
        <Typography
          color="primary"
          style={{ cursor: 'pointer' }}
          variant="overline"
          onClick={() => setIsNewUser(!isNewUser)}
        >
          {isNewUser ? 'Already a user?' : "Sign up (It's free)"}
        </Typography>
      </div>

      <div style={{ clear: 'both' }} />
    </>
  )
}
