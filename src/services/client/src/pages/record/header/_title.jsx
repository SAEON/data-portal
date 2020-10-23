import { Typography } from '@material-ui/core'

export default ({ doi }) => (
  <Typography variant="overline" component="h1">
    {doi || 'UNKNOWN DOI'}
  </Typography>
)
