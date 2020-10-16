import Row from '../_row'
import { Typography } from '@material-ui/core'

export default ({ descriptions }) => (
  <Row title={'Abstract'}>
    <Typography variant="body2">
      {descriptions.map(desc =>
        desc.descriptionType === 'Abstract' ? desc.description : undefined
      )}
    </Typography>
  </Row>
)
