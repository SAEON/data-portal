import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { CURATOR_CONTACT, TECHNICAL_CONTACT } from '../../config'

export default () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Contact us</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">Data enquiries</Typography>
        <Typography variant="body2">{CURATOR_CONTACT.replace('@', ' [ at ] ')}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">Software development inquiries</Typography>
        <Typography variant="body2">{TECHNICAL_CONTACT.replace('@', ' [ at ] ')}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">Bugs / technical support</Typography>
        <Typography variant="body2">https://github.com/SAEON/data-portal/issues</Typography>
      </Grid>
    </Grid>
  )
}
