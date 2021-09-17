import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ShareIcon from 'mdi-react/LinkPlusIcon'
import { CATALOGUE_CLIENT_ADDRESS } from '../../../../../../../config'

export default ({ id }) => {
  return (
    <Tooltip title="Open dashboard" placement="left-start">
      <IconButton
        onClick={() => {
          window.open(`${CATALOGUE_CLIENT_ADDRESS}/dashboard/${id}`)
        }}
        size="small"
      >
        <ShareIcon size={20} />
      </IconButton>
    </Tooltip>
  )
}
