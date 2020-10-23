import { IconButton } from '@material-ui/core'
import { NavigateBefore as PageBackIcon } from '@material-ui/icons'

export default ({ setCursors, loading, cursors, catalogue }) => {
  return (
    <IconButton
      disabled={loading ? true : cursors?.currentPage < 1}
      onClick={() => {
        setCursors({
          start: catalogue?.records?.pageInfo?.startCursor,
          end: undefined,
          currentPage: cursors?.currentPage - 1,
        })
      }}
    >
      <PageBackIcon />
    </IconButton>
  )
}
