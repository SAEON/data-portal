import Typography from '@material-ui/core/Typography'

export default ({ catalogue, style }) => {
  return (
    <header>
      <Typography component="div" variant="overline" noWrap style={style}>
        {catalogue?.records ? `${catalogue.records.totalCount}` : '...'} Results
      </Typography>
    </header>
  )
}
