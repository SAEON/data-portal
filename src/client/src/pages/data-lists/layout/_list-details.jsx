import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

export default ({ name, description, search }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <pre>{JSON.stringify(search, null, 2)}</pre>
      </CardContent>
    </Card>
  )
}
