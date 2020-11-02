import { Tooltip, Button, IconButton } from '@material-ui/core'
import { GetApp as GetAppIcon } from '@material-ui/icons'
import SimpleLink from '../link'

export default ({
  immutableResource,
  children,
  fontSize = 'default',
  tooltipPlacement,
  ...props
}) => {
  return (
    <SimpleLink style={{ display: 'block' }} uri={immutableResource?.resourceDownload?.downloadURL}>
      <Tooltip
        placement={tooltipPlacement || 'bottom'}
        title={
          `${
            immutableResource?.resourceDescription || 'Unkonwn resource'
          } (${immutableResource?.resourceDownload?.downloadURL?.replace(/.*\./, '')})` ||
          'Unknown download'
        }
      >
        <span>
          {children ? (
            <Button {...props} startIcon={<GetAppIcon />}>
              {children}
            </Button>
          ) : (
            <IconButton disabled={!immutableResource?.resourceDownload?.downloadURL} {...props}>
              <GetAppIcon fontSize={fontSize} />
            </IconButton>
          )}
        </span>
      </Tooltip>
    </SimpleLink>
  )
}
