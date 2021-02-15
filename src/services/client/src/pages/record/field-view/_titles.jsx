import Row from '../_row'
import Typography from '@material-ui/core/Typography'

export default ({ titles }) => (
  <Row title={'Title'}>
    <Typography variant="body2" component="h2">
      {titles[0].title}
    </Typography>
  </Row>
)
