import IconButton from '@material-ui/core/IconButton'
import PageBackIcon from '@material-ui/icons/NavigateBefore'

export default ({ setCursors, loading, cursors, catalogue }) => {
  return (
    <IconButton
      aria-label="Got to previous results page"
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
