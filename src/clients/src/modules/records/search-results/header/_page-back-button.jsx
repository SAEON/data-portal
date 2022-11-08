import IconButton from '@mui/material/IconButton'
import { ChevronLeft as ChevronLeftIcon } from '../../../../components/icons'

export default ({ setCursors, loading, cursors, catalogue }) => {
  return (
    <IconButton
      aria-label="Got to previous results page"
      disabled={loading ? true : cursors?.currentPage < 1}
      onClick={() => {
        setCursors({
          start: catalogue?.search?.pageInfo?.startCursor,
          end: undefined,
          currentPage: cursors?.currentPage - 1,
        })
      }}
      size="medium"
    >
      <ChevronLeftIcon />
    </IconButton>
  )
}
