import { Tooltip, Button, IconButton } from '@material-ui/core'
import { GetApp as GetAppIcon } from '@material-ui/icons'
import SimpleLink from '../link'
import { CATALOGUE_API_ADDRESS } from '../../config'

export default ({
  immutableResource,
  children,
  fontSize = 'default',
  tooltipPlacement,
  ...props
}) => {
  const { resourceDescription, resourceDownload } = immutableResource || {}
  const downloadURL =
    new URL(resourceDownload?.downloadURL || 'http://nothing.com').protocol === 'http:'
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
            <Button {...props} startIcon={<GetAppIcon />}>
              {children}
            </Button>
          ) : (
            <IconButton disabled={!downloadURL} {...props}>
              <GetAppIcon fontSize={fontSize} />
            </IconButton>
          )}
        </span>
      </Tooltip>
    </SimpleLink>
  )
}
