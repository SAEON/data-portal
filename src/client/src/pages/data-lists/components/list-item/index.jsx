import Grid from '@material-ui/core/Grid'
import DeleteItem from './delete'
import Search from './search'
import Details from './details'
import Share from './share'

export default props => {
  return (
    <Grid container spacing={2}>
      {/* DELETE */}
      <Grid item xs={12}>
        <DeleteItem {...props} />
      </Grid>

      {/* SHARE */}
      <Grid item xs={12}>
        <Share {...props} />
      </Grid>

      {/* DETAILS */}
      <Grid item xs={12}>
        <Details {...props} />
      </Grid>

      {/* SEARCH */}
      <Grid item xs={12}>
        <Search {...props} />
      </Grid>
    </Grid>
  )
}
