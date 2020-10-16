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
    <SimpleLink style={{ display: 'block' }} uri={immutableResource.resourceURL}>
      <Tooltip
        placement={tooltipPlacement || 'bottom'}
        title={`${immutableResource.resourceDescription} (${immutableResource.resourceURL.replace(
          /.*\./,
          ''
        )})`}
      >
        {children ? (
          <Button {...props} startIcon={<GetAppIcon />}>
            {children}
          </Button>
        ) : (
          <IconButton {...props}>
            <GetAppIcon fontSize={fontSize} />
          </IconButton>
        )}
      </Tooltip>
    </SimpleLink>
  )
}
