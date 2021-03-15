import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ShareIcon from 'mdi-react/ViewCompactIcon'
import { CATALOGUE_CLIENT_ADDRESS } from '../../../../../../../config'

// TODO - stop people sharing a poll link forever

export default ({ id }) => {
  return (
    <Tooltip title="Realtime layout preview" placement="bottom-start">
      <IconButton
        onClick={() => {
          const confirmed = confirm('This link will only be active for a short time')
          if (confirmed) {
            window.open(`${CATALOGUE_CLIENT_ADDRESS}/render/dashboard?id=${id}&poll=true`)
          }
        }}
        size="small"
      >
        <ShareIcon size={20} />
      </IconButton>
    </Tooltip>
  )
}
