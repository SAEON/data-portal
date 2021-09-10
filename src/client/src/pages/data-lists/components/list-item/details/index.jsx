import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

export default ({ title, description, createdBy }) => {
  return (
    <Card variant="outlined">
      <CardHeader title={'Details'} subheader={'Configure general list details here'} />
      <CardContent>
        <Typography gutterBottom>Title: {title}</Typography>
        <Typography gutterBottom>Description: {description}</Typography>
        <Typography gutterBottom>Created by: {createdBy}</Typography>
      </CardContent>
    </Card>
  )
}
