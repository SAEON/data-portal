import Row from '../_row'
import Typography from '@material-ui/core/Typography'

export default ({ publisher, publicationYear }) => (
  <Row title="Publisher">
    <Typography variant="body2">{`${publisher} (${publicationYear || '?'})`}</Typography>
  </Row>
)
