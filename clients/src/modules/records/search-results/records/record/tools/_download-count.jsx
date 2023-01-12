import Tooltip from '@mui/material/Tooltip'
import { InformationVariant } from '../../../../../../components/icons'
import IconButton from '@mui/material/IconButton'
import { Span } from '../../../../../../components/html-tags'

export default ({ downloadCount, canViewDownloadCount }) => (
  <Tooltip
    placement="top"
    title={
      canViewDownloadCount
        ? `${downloadCount} download${downloadCount === 1 ? '' : 's'}`
        : 'Log in to view download count'
    }
  >
    <Span>
      <IconButton disableTouchRipple disableRipple disabled={!canViewDownloadCount}>
        <InformationVariant fontSize="small" />
      </IconButton>
    </Span>
  </Tooltip>
)
