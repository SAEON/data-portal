import { useState } from 'react'
import { MessageDialogue } from '..'
import { Tabs, Tab } from '@material-ui/core'
import { Share as ShareIcon } from '@material-ui/icons'
import DialogueContents from './_dialogue-contents'

export default ({ icon, iconProps, tooltipProps, badgeProps, state, params }) => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <MessageDialogue
      tooltipProps={
        tooltipProps || {
          title: 'Create a link for sharing or embedding this page',
          placement: 'left',
        }
      }
      title={undefined}
      iconProps={
        iconProps || {
          color: 'inherit',
        }
      }
      icon={icon || <ShareIcon />}
      badgeProps={badgeProps}
    >
      <Tabs value={tabIndex} onChange={(e, i) => setTabIndex(i)}>
        <Tab label="Share" />
        <Tab label="Embed" />
      </Tabs>
      <DialogueContents tabIndex={tabIndex} state={state} params={params} />
    </MessageDialogue>
  )
}
