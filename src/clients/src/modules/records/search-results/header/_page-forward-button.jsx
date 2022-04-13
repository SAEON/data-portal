import IconButton from '@mui/material/IconButton'
import PageForwardIcon from '@mui/icons-material/NavigateNext'

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
      style={{ marginRight: 5 }}
      size="large"
    >
      <PageForwardIcon />
    </IconButton>
  )
}
