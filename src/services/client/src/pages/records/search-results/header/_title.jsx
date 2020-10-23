import { Typography } from '@material-ui/core'

export default ({ catalogue }) => {
  return (
    <Typography component="div" variant="overline" noWrap style={{ display: 'flex' }}>
      {catalogue?.records ? `${catalogue.records.totalCount}` : '...'} Records
    </Typography>
  )
}
