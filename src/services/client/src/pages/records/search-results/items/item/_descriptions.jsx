import { CardContent, Typography } from '@material-ui/core'

export default ({ descriptions }) => (
  <CardContent>
    <Typography style={{ whiteSpace: 'break-spaces', wordBreak: 'break-word' }} variant="body2">
      {descriptions?.[0]?.description || 'No description'}
    </Typography>
  </CardContent>
)
