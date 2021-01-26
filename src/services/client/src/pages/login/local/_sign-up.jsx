import { useState } from 'react'
import { CATALOGUE_API_ADDRESS, CATALOGUE_CLIENT_ADDRESS } from '../../../config'
import { Button, TextField, Tooltip } from '@material-ui/core'
import useStyles from '../style'
import clsx from 'clsx'

export default () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const classes = useStyles()

  const disabled = !(password.length > 6 && confirmedPassword === password && username)

  return (
    <form style={{ minHeight: 212 }} action={`${CATALOGUE_API_ADDRESS}/login/signup`} method="POST">
      <input
        style={{ display: 'none' }}
        name="redirect"
        value={`${CATALOGUE_CLIENT_ADDRESS}/login`}
      />
      <TextField
        value={username}
        onChange={e => setUsername(e.target.value)}
        autoComplete="off"
        fullWidth
        label="Username"
        name="username"
      />
      <TextField
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="off"
        fullWidth
        label="Password"
        type="password"
        name="password"
      />
      <TextField
        value={confirmedPassword}
        onChange={e => setConfirmedPassword(e.target.value)}
        autoComplete="off"
        fullWidth
        label="Confirm password"
        type="password"
        className={clsx(classes.confirmPassword)}
      />
      <Tooltip title={disabled ? "Passwords don't match, or too short" : 'Create new user'}>
        <span>
          <Button
            disabled={disabled}
            className={clsx(classes.button)}
            color="primary"
            fullWidth
            disableElevation={true}
            variant="contained"
            type="submit"
          >
            Sign up
          </Button>
        </span>
      </Tooltip>
    </form>
  )
}
