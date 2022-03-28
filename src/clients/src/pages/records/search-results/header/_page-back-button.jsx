import IconButton from '@mui/material/IconButton'
import PageBackIcon from '@mui/icons-material/NavigateBefore'

export default ({ setCursors, loading, cursors, catalogue }) => {
  return (
    <IconButton
      aria-label="Got to previous results page"
      disabled={loading ? true : cursors?.currentPage < 1}
      onClick={() => {
        setCursors({
          start: catalogue?.records?.pageInfo?.startCursor,
          end: undefined,
          currentPage: cursors?.currentPage - 1
        })
      }}
      size="large"
    >
      <PageBackIcon />
    </IconButton>
  )
}
