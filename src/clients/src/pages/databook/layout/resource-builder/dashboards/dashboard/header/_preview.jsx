import ShareIcon from 'mdi-react/FileEyeOutlineIcon'
import { CLIENTS_PUBLIC_ADDRESS } from '../../../../../../../config'
import MessageDialogue from '../../../../../../../components/message-dialogue'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

/**
 * TODO
 *
 * Make the link ephemeral otherwise everyone will share links
 * that poll continuously
 */

export default ({ id }) => {
  return (
    <MessageDialogue
      iconProps={{
        size: 'small',
      }}
      titleProps={{ style: { textAlign: 'center' } }}
      tooltipProps={{
        title: 'Realtime layout preview',
        placement: 'left-start',
      }}
      title="Dashboard preview"
      icon={<ShareIcon size={20} />}
    >
      {close => {
        return (
          <>
            <DialogContent>
              This link will only be active for a short time and should NOT be shared for this
              reason
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  window.open(`${CLIENTS_PUBLIC_ADDRESS}/dashboard/${id}?poll=true`)
                  close()
                }}
                variant="text"
              >
                Continue
              </Button>
            </DialogActions>
          </>
        )
      }}
    </MessageDialogue>
  )
}
