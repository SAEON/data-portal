import { Suspense, lazy } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DialogContent from '@material-ui/core/DialogContent'
import useTheme from '@material-ui/core/styles/useTheme'
import CloseIcon from 'mdi-react/CloseIcon'
import PreviewIcon from 'mdi-react/EyeIcon'
import MessageDialogue from '../../components/message-dialogue'
import Loading from '../../components/loading'

const Map = lazy(() => import('./_map'))

export default ({ id, titles, linkedResources, geoLocations, buttonSize = 'small' }) => {
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
      iconProps={{ size: buttonSize, 'aria-label': 'Preview dataset as a map' }}
      icon={<PreviewIcon />}
      title={onClose => (
        <div style={{ display: 'flex' }}>
          <Typography style={{ marginRight: 'auto', alignSelf: 'center' }}>{title}</Typography>
          <IconButton
            aria-label="Close map"
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
          <Map geoLocations={geoLocations} resourceURL={resourceURL} title={title} id={id} />
        </Suspense>
      </DialogContent>
    </MessageDialogue>
  )
}
