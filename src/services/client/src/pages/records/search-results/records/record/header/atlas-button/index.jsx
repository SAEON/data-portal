import { Suspense, lazy } from 'react'
import { IconButton, Typography, DialogContent } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import CloseIcon from 'mdi-react/CloseIcon'
import PreviewIcon from 'mdi-react/EyeIcon'
import MessageDialogue from '../../../../../../../components/message-dialogue'
import Loading from '../../../../../../../components/loading'

const Map = lazy(() => import('./_map'))

export default ({ id, titles, linkedResources }) => {
  const theme = useTheme()
  const title = titles[0].title

  const hasMap = Boolean(
    linkedResources?.find(({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY')
  )

  if (!hasMap) {
    return null
  }

  const { resourceURL } = linkedResources.find(
    ({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY'
  )

  return (
    <MessageDialogue
      iconProps={{ size: 'small' }}
      icon={<PreviewIcon />}
      title={onClose => (
        <div style={{ display: 'flex' }}>
          <Typography style={{ marginRight: 'auto', alignSelf: 'center' }}>{title}</Typography>
          <IconButton
            size="small"
            onClick={e => {
              e.stopPropagation()
              onClose()
            }}
            style={{ marginLeft: 'auto', alignSelf: 'center' }}
          >
            <CloseIcon />
          </IconButton>
        </div>
      )}
      titleProps={{
        style: {
          paddingRight: theme.spacing(2),
          paddingLeft: theme.spacing(2),
        },
      }}
      tooltipProps={{
        placement: 'right',
        title: `Preview dataset as map`,
      }}
      dialogueContentProps={{ style: { padding: 0 } }}
      dialogueProps={{ fullWidth: true }}
      paperProps={{ style: { maxWidth: 'none', minHeight: '66px' } }}
    >
      <DialogContent style={{ margin: 0, padding: 0, height: window.innerHeight - 200 }}>
        <Suspense fallback={<Loading />}>
          <Map resourceURL={resourceURL} title={title} id={id} />
        </Suspense>
      </DialogContent>
    </MessageDialogue>
  )
}
