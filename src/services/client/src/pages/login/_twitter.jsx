import { CATALOGUE_API_ADDRESS } from '../../config'
import TwitterIcon from 'mdi-react/TwitterIcon'
import { Button, Tooltip } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './style'

export default ({ redirect }) => {
  const classes = useStyles()

  return (
    <Tooltip title={'Coming soon!'} placement="bottom-end">
      <span>
        <Button
          disabled={true}
          href={`${CATALOGUE_API_ADDRESS}/login/twitter?redirect=${redirect}`}
          fullWidth
          className={clsx(classes.button)}
          color="primary"
          disableElevation={true}
          variant="outlined"
          startIcon={<TwitterIcon size={22} />}
        >
          Connect with Twitter
        </Button>
      </span>
    </Tooltip>
  )
}
