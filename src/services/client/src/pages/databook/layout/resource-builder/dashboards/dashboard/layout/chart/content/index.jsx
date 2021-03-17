import Typography from '@material-ui/core/Typography'

export default ({ id, title }) => {
  return <Typography variant="overline">{title || id}</Typography>
}
