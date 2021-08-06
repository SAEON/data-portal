import { useState } from 'react'
import MessageDialogue from '../../../../../../components/message-dialogue'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ShareIcon from 'mdi-react/LinkPlusIcon'
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
      icon={icon || <ShareIcon />}
      badgeProps={badgeProps}
    >
      <Tabs value={tabIndex} onChange={(e, i) => setTabIndex(i)}>
        <Tab label="Share" />
        <Tab label="Embed" />
      </Tabs>
      <DialogueContents tabIndex={tabIndex} search={search} params={params} />
    </MessageDialogue>
  )
}
