import RemoveFilter from './_remove-filter'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import useStyles from './style'
import clsx from 'clsx'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../../../../../components/loading'

export default ({ filterId, dashboardId }) => {
  const classes = useStyles()

  const { error, loading, data } = useQuery(
    gql`
      query filters($ids: [ID!]!) {
        filters(ids: $ids) {
          id
          name
        }
      }
    `,
    {
      variables: { ids: [filterId] },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  const filter = data.filters[0]

  return (
    <Grid item className={clsx(classes.filter)}>
      <Typography variant="overline">{filter.name || filter.id}</Typography>
      <RemoveFilter filterId={filterId} dashboardId={dashboardId} />
    </Grid>
  )
}
