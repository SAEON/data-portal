import Typography from '@mui/material/Typography'

export default ({ doi }) => (
  <>
    <Typography sx={{ fontWeight: 'bold', mr: theme => theme.spacing(1) }} variant="overline">
      DOI:
    </Typography>
    <Typography variant="overline" component="h3">
      {doi ? doi : 'UNKNOWN'}
    </Typography>
  </>
)
