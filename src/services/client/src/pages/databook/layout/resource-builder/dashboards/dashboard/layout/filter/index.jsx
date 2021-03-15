import RemoveFilterButton from './_remove-filter-button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import useStyles from './style'
import clsx from 'clsx'
import { gql, useQuery } from '@apollo/client'

export default ({ filterId, dashboard }) => {
  const classes = useStyles()

  const { error, loading, data } = useQuery(
    gql`
      query($ids: [ID!]) {
        filters(ids: $ids) {
          id
          name
        }
      }
    `,
    {
      variables: {
        ids: [filterId],
      },
    }
  )

  if (loading) {
    return <Typography variant="overline">{filterId}</Typography>
  }

  if (error) {
    throw error
  }

  const filterName = data?.filters[0].name
  return (
    <Grid item className={clsx(classes.filter)}>
      <Typography variant="overline">{filterName || filterId}</Typography>
      <RemoveFilterButton filterId={filterId} dashboard={dashboard} />
    </Grid>
  )
}
