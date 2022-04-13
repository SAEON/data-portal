import Typography from '@mui/material/Typography'

export default ({ catalogue, pageSize, cursors }) => {
  return (
    <Typography variant="overline" noWrap>
      {catalogue?.search
        ? `${cursors.currentPage * pageSize + 1} - ${Math.min(
            cursors.currentPage * pageSize + pageSize,
            catalogue.search.totalCount
          )}`
        : '... ...'}
    </Typography>
  )
}
