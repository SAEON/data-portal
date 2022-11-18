import Typography from '@mui/material/Typography'

export default ({ catalogue, pageSize, cursors }) => {
  return (
    <Typography
      sx={{
        overflow: 'revert',
        textOverflow: 'revert',
        lineHeight: '100%',
        mx: theme => theme.spacing(0.25),
      }}
      variant="overline"
      noWrap
    >
      {catalogue?.search
        ? `${cursors.currentPage * pageSize + 1} - ${Math.min(
            cursors.currentPage * pageSize + pageSize,
            catalogue.search.totalCount
          )}`
        : '... ...'}
    </Typography>
  )
}
