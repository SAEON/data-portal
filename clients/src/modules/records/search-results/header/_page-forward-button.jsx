import IconButton from '@mui/material/IconButton'
import { ChevronRight as ChevronRightIcon } from '../../../../components/icons'

export default ({ cursors, pageSize, catalogue, setCursors, loading }) => {
  return (
    <IconButton
      aria-label="Go to next results page"
      disabled={
        loading ? true : cursors?.currentPage * pageSize + pageSize >= catalogue?.search?.totalCount
      }
      onClick={() => {
        setCursors({
          start: undefined,
          end: catalogue?.search?.pageInfo?.endCursor,
          currentPage: cursors?.currentPage + 1,
        })
      }}
      sx={{ mr: theme => theme.spacing(1) }}
      size="small"
    >
      <ChevronRightIcon fontSize="small" />
    </IconButton>
  )
}
