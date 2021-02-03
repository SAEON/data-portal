import { useState } from 'react'
import {
  CATALOGUE_API_ADDRESS,
  CATALOGUE_TECHNICAL_CONTACT,
  CATALOGUE_CLIENT_ADDRESS,
} from '../../../config'
import { Button, TextField, Typography, Box } from '@material-ui/core'
import useStyles from '../style'
import getUriState from '../../../lib/fns/get-uri-state'
import clsx from 'clsx'

export default () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const classes = useStyles()
  const { redirect = CATALOGUE_CLIENT_ADDRESS } = getUriState()

  return (
    <form style={{ minHeight: 212 }} action={`${CATALOGUE_API_ADDRESS}/login/local`} method="POST">
      <input
        style={{ display: 'none' }}
        onChange={e => e}
        name="successRedirect"
        value={redirect}
      />
      <input
        style={{ display: 'none' }}
        name="failureRedirect"
        onChange={e => e}
        value={`${CATALOGUE_CLIENT_ADDRESS}/login`}
      />
      <TextField
        value={username}
        onChange={e => setUsername(e.target.value)}
        autoComplete="username"
        fullWidth
        label="Username"
        name="username"
      />
      <TextField
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
        fullWidth
        label="Password"
        type="password"
        name="password"
      />
      <Box className={clsx(classes.box)}>
        <Button
          style={{ marginLeft: 'auto' }}
          color="primary"
          size="small"
          disableElevation
          variant="outlined"
        >
          <Typography
            onClick={() => alert(`Please request assistance from ${CATALOGUE_TECHNICAL_CONTACT}`)}
            className={clsx(classes.formLabel)}
          >
            Forgot password
          </Typography>
        </Button>
      </Box>
      <Button
        className={clsx(classes.button)}
        color="primary"
        fullWidth
        disableElevation={true}
        variant="contained"
        type="submit"
      >
        Log in
      </Button>
    </form>
  )
}
