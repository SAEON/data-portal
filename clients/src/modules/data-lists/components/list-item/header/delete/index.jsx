import Mutation from './_mutation'
import MessageDialogue from '../.././../../../../components/message-dialogue'
import { Delete as DeleteIcon } from '../../../../../../components/icons'
import Button from '@mui/material/Button'

export default props => {
  return (
    <MessageDialogue
      buttonType="button"
      title="Confirm"
      text="Are you sure you want to delete this list?"
      tooltipProps={{
        title: 'Delete this list',
      }}
      buttonProps={{
        startIcon: <DeleteIcon fontSize="small" />,
        children: 'Delete list',
        size: 'small',
      }}
      actions={[
        ({ toggle }) => (
          <Button size="small" variant="outlined" disableElevation onClick={toggle}>
            Cancel
          </Button>
        ),
        ({ toggle }) => <Mutation toggle={toggle} {...props} />,
      ]}
    />
  )
}
