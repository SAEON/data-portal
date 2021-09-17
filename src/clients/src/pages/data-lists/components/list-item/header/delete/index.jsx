import Mutation from './_mutation'
import MessageDialogue from '../.././../../../../components/message-dialogue'
import DeleteIcon from 'mdi-react/DeleteIcon'
import Button from '@material-ui/core/Button'

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
        startIcon: <DeleteIcon size={18} />,
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
