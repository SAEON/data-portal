import { Button, FormControlLabel, Checkbox, TextField, Typography, Box } from '@material-ui/core'
import useStyles from './style'
import clsx from 'clsx'
import { CATALOGUE_API_ADDRESS } from '../../config'

export default () => {
  const classes = useStyles()

  return (
    <form
      // onSubmit={() => alert('hi')}
      action={`${CATALOGUE_API_ADDRESS}/login/local`}
      method="POST"
    >
      <TextField autoComplete="username" type="email" fullWidth label="Email address" />
      <TextField autoComplete="current-password" fullWidth label="Password" type="password" />
      <Box className={clsx(classes.box)}>
        <Button size="small" disableElevation variant="text">
          <Typography className={clsx(classes.formLabel)}>Forgot password</Typography>
        </Button>
        <FormControlLabel
          style={{ marginLeft: 'auto' }}
          value="start"
          control={<Checkbox color="primary" size="small" />}
          label={
            <Typography className={clsx(classes.formLabel)} variant="overline">
              Remember me
            </Typography>
          }
          labelPlacement="start"
        />
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
      <Button
        className={clsx(classes.button)}
        color="primary"
        fullWidth
        disableElevation={true}
        variant="contained"
      >
        Sign up (It&apos;s free)
      </Button>
    </form>
  )
}
