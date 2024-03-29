import { useState } from 'react'
import MessageDialogue from '../../../../../../components/message-dialogue'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Share as ShareIcon } from '../../../../../../components/icons'
import DialogueContents from './_dialogue-contents'

export default ({ icon, iconProps, tooltipProps, badgeProps, search, params }) => {
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
      icon={icon || <ShareIcon fontSize="small" />}
      badgeProps={badgeProps}
    >
      <Tabs value={tabIndex} onChange={(e, i) => setTabIndex(i)}>
        <Tab label="Share" />
        <Tab label="Embed" />
        <Tab label="Filter DSL" />
      </Tabs>
      <DialogueContents tabIndex={tabIndex} search={search} params={params} />
    </MessageDialogue>
  )
}
