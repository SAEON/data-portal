import Chip from './_chip'
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

  return <Chip {...filter} dashboardId={dashboardId} />
}
