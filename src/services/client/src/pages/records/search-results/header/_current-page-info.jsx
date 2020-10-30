import { Typography } from '@material-ui/core'

export default ({ catalogue, pageSize, cursors }) => {
  return (
    <Typography variant="overline" noWrap>
      {catalogue?.records
        ? `${cursors.currentPage * pageSize + 1} - ${Math.min(
            cursors.currentPage * pageSize + pageSize,
            catalogue.records.totalCount
          )}`
        : '... ...'}
    </Typography>
  )
}
