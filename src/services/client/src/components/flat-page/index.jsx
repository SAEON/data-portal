import Grid from '@material-ui/core/Grid'

export default ({ children }) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        {children}
      </Grid>
    </Grid>
  )
}
