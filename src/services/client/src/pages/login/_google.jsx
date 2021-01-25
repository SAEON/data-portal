import { CATALOGUE_API_ADDRESS } from '../../config'
import GoogleIcon from 'mdi-react/GoogleIcon'
import { Button, Tooltip } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './style'

export default ({ redirect }) => {
  const classes = useStyles()

  return (
    <Tooltip title={'Login via your Google account (SAEON employees only)'} placement="bottom-end">
      <span>
        <Button
          href={`${CATALOGUE_API_ADDRESS}/login/google?redirect=${redirect}`}
          fullWidth
          className={clsx(classes.button)}
          color="primary"
          disableElevation={true}
          variant="outlined"
          startIcon={<GoogleIcon size={22} />}
        >
          Connect with Google
        </Button>
      </span>
    </Tooltip>
  )
}
