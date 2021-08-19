import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { CURATOR_CONTACT, CATALOGUE_TECHNICAL_CONTACT } from '../../config'

export default () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Contact us</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">Website and technical feedback</Typography>
        <Typography variant="body2">
          {CATALOGUE_TECHNICAL_CONTACT.replace('@', ' [ at ] ')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">Data enquiries</Typography>
        <Typography variant="body2">{CURATOR_CONTACT.replace('@', ' [ at ] ')}</Typography>
      </Grid>
    </Grid>
  )
}
