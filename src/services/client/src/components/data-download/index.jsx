import { Tooltip, Button, IconButton } from '@material-ui/core'
import DownloadIcon from 'mdi-react/DownloadIcon'
import SimpleLink from '../link'
import { CATALOGUE_API_ADDRESS } from '../../config'

const PLACEHOLDER_URI = 'http://nothing.com'

export default ({
  immutableResource,
  children,
  size = 22,
  IconButtonSize = 'medium',
  tooltipPlacement,
  ...props
}) => {
  const { resourceDescription, resourceDownload } = immutableResource || {}
  const downloadURL =
    new URL(resourceDownload?.downloadURL || PLACEHOLDER_URI).protocol === 'http:'
      ? `${CATALOGUE_API_ADDRESS}/download-proxy?uri=${resourceDownload?.downloadURL}`
      : resourceDownload?.downloadURL

  return (
    <SimpleLink
      download={resourceDescription || 'Unknown resource'}
      style={{ display: 'block' }}
      uri={downloadURL}
    >
      <Tooltip
        placement={tooltipPlacement || 'bottom'}
        title={
          `${resourceDescription || 'Unknown resource'} (${downloadURL?.replace(/.*\./, '')})` ||
          'Unknown download'
        }
      >
        <span>
          {children ? (
            <Button {...props} startIcon={<DownloadIcon />}>
              {children}
            </Button>
          ) : (
            <IconButton disabled={downloadURL === PLACEHOLDER_URI} size={IconButtonSize} {...props}>
              <DownloadIcon size={size} />
            </IconButton>
          )}
        </span>
      </Tooltip>
    </SimpleLink>
  )
}
