import Typography from '@mui/material/Typography'

export default ({ catalogue, ...props }) => {
  return (
    <header>
      <Typography component="div" variant="overline" noWrap {...props}>
        {catalogue?.search ? `${catalogue.search.totalCount}` : '...'} Results
      </Typography>
    </header>
  )
}
