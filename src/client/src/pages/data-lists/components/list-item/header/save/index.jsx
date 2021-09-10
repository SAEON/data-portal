import Mutation from './_mutation'
import MessageDialogue from '../../../../../../components/message-dialogue'
import SaveIcon from 'mdi-react/ContentSaveCogIcon'
import Button from '@material-ui/core/Button'

export default () => {
  return (
    <MessageDialogue
      buttonType="button"
      title="Confirm"
      text="Are you sure you want to overwrite this list?"
      tooltipProps={{
        title: 'Save this list',
      }}
      buttonProps={{
        startIcon: <SaveIcon size={18} />,
        children: 'Save list',
        size: 'small',
      }}
      actions={[
        ({ toggle }) => (
          <Button size="small" variant="outlined" disableElevation onClick={toggle}>
            Cancel
          </Button>
        ),
        ({ toggle }) => <Mutation toggle={toggle} />,
      ]}
    />
  )
}
