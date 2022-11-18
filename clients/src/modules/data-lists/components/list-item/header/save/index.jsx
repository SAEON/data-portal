import { useContext } from 'react'
import { context as listContext } from '../../_context'
import Mutation from './_mutation'
import MessageDialogue from '../../../../../../components/message-dialogue'
import { ContentSave as SaveIcon } from '../../../../../../components/icons'
import Button from '@mui/material/Button'

export default () => {
  const { preventSave } = useContext(listContext)

  return (
    <MessageDialogue
      buttonType="button"
      title="Confirm"
      text="Are you sure you want to overwrite this list?"
      tooltipProps={{
        title: preventSave ? 'There is an error in the Filter JSON' : 'Save list',
      }}
      buttonProps={{
        startIcon: <SaveIcon fontSize="small" />,
        children: 'Save list',
        size: 'small',
        disabled: Boolean(preventSave),
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
