import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import CardActions from '@material-ui/core/CardActions'
import DeleteItem from './_delete-item'

export default ({
  id,
  title,
  description,
  search,
  url,
  createdBy,
  showSearchBar,
  disableSidebar,
}) => {
  return (
    <Card variant="outlined">
      <CardHeader title={title} subheader={description} />
      <CardContent>
        <Typography gutterBottom>Created by: {createdBy}</Typography>
        <Typography gutterBottom>Search bar: {'' + showSearchBar}</Typography>
        <Typography gutterBottom>Side filters: {'' + !disableSidebar}</Typography>
        <Link target="_blank" rel="noopener noreferrer" href={url}>
          {url}
        </Link>
        <pre style={{ maxHeight: 800, overflow: 'auto' }}>{JSON.stringify(search, null, 2)}</pre>
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <DeleteItem id={id} />
      </CardActions>
    </Card>
  )
}
