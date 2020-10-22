import { CardContent, Typography } from '@material-ui/core'

export default ({ creators }) => (
  <CardContent>
    <Typography variant="overline">
      {creators?.map(({ name }) => name).join(', ') || 'Creator info missing'}
    </Typography>
  </CardContent>
)
