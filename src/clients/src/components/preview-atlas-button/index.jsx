import { Suspense, lazy } from 'react'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DialogContent from '@mui/material/DialogContent'
import { useTheme } from '@mui/material/styles'
import { Eye as EyeIcon, Close as CloseIcon } from '../icons'
import MessageDialogue from '../../components/message-dialogue'
import Loading from '../../components/loading'
import { Div } from '../html-tags'

const Map = lazy(() => import('./_map'))

export default ({ id, titles, linkedResources, geoLocations, buttonSize = 'small' }) => {
  const theme = useTheme()
  const title = titles[0].title

  const linkedResource =
    linkedResources?.find(
      ({ linkedResourceType }) => linkedResourceType.toUpperCase() === 'QUERY'
    ) || {}

  const disabled = !linkedResource?.resourceURL

  return (
    <MessageDialogue
      disabled={disabled}
      ariaLabel="Toggle map preview"
      id={`map-preview-${id}`}
      iconProps={{ size: buttonSize, 'aria-label': 'Preview dataset as a map' }}
      icon={<EyeIcon fontSize="small" />}
      title={(onClose, open) => (
        <Div sx={{ display: 'flex' }}>
          <Typography style={{ marginRight: 'auto', alignSelf: 'center' }}>{title}</Typography>
          <IconButton
            aria-label="Close map preview"
            aria-controls={`map-preview-${id}`}
            aria-expanded={open}
            size="small"
            onClick={e => {
              e.stopPropagation()
              onClose()
            }}
            style={{ marginLeft: 'auto', alignSelf: 'center' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Div>
      )}
      titleProps={{
        style: {
          paddingRight: theme.spacing(2),
          paddingLeft: theme.spacing(2),
        },
      }}
      tooltipProps={{
        placement: 'top-start',
        title: disabled ? 'No preview available' : `Preview dataset as map`,
      }}
      dialogueContentProps={{ style: { padding: 0 } }}
      dialogueProps={{ fullWidth: true }}
      paperProps={{ style: { maxWidth: 'none', minHeight: '66px' } }}
    >
      <DialogContent style={{ margin: 0, padding: 0, height: window.innerHeight - 200 }}>
        <Suspense fallback={<Loading />}>
          <Map geoLocations={geoLocations} linkedResource={linkedResource} title={title} id={id} />
        </Suspense>
      </DialogContent>
    </MessageDialogue>
  )
}
