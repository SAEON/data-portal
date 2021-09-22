import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ShareIcon from 'mdi-react/LinkPlusIcon'
import { CLIENTS_PUBLIC_ADDRESS } from '../../../../../../config'

export default ({ id }) => {
  return (
    <Tooltip title="Open chart" placement="left-start">
      <IconButton
        onClick={() => {
          window.open(`${CLIENTS_PUBLIC_ADDRESS}/chart/${id}`)
        }}
        size="small"
      >
        <ShareIcon size={20} />
      </IconButton>
    </Tooltip>
  )
}
