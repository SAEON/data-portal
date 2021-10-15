import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import ShareIcon from 'mdi-react/LinkPlusIcon'
import { CLIENTS_PUBLIC_ADDRESS } from '../../../../../../../config'

export default ({ id }) => {
  return (
    <Tooltip title="Open dashboard" placement="left-start">
      <IconButton
        onClick={() => {
          window.open(`${CLIENTS_PUBLIC_ADDRESS}/dashboard/${id}`)
        }}
        size="small"
      >
        <ShareIcon size={20} />
      </IconButton>
    </Tooltip>
  )
}
