import Typography from '@mui/material/Typography'

export default ({ catalogue, style }) => {
  return (
    <header>
      <Typography component="div" variant="overline" noWrap style={style}>
        {catalogue?.search ? `${catalogue.search.totalCount}` : '...'} Results
      </Typography>
    </header>
  )
}
