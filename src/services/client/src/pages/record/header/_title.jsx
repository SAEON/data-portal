import Typography from '@material-ui/core/Typography'

export default ({ doi }) => (
  <Typography variant="overline" component="h1">
    {doi && (
      <>
        <b>DOI: </b>
        {doi}
      </>
    )}
    {!doi && 'UNKNOWN DOI'}
  </Typography>
)
