import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

export default () => {
  return (
    <Card variant="outlined">
      <Typography variant="overline" style={{ display: 'block', textAlign: 'center' }}>
        The title
      </Typography>
    </Card>
  )
}
