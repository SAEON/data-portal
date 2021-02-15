import { IconButton } from '@material-ui/core'
import { NavigateNext as PageForwardIcon } from '@material-ui/icons'

export default ({ cursors, pageSize, catalogue, setCursors, loading }) => {
  return (
    <IconButton
      disabled={
        loading
          ? true
          : cursors?.currentPage * pageSize + pageSize >= catalogue?.records?.totalCount
      }
      onClick={() => {
        setCursors({
          start: undefined,
          end: catalogue?.records?.pageInfo?.endCursor,
          currentPage: cursors?.currentPage + 1,
        })
      }}
      style={{ marginRight: 5 }}
    >
      <PageForwardIcon />
    </IconButton>
  )
}
