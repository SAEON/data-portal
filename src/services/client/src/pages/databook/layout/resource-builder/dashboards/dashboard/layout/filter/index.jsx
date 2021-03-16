import { useContext } from 'react'
import RemoveFilter from './_remove-filter'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import useStyles from './style'
import clsx from 'clsx'
import { gql, useQuery } from '@apollo/client'
import { context as databookContext } from '../../../../../../contexts/databook-provider'

export default ({ filterId, dashboard }) => {
  const { id: databookId } = useContext(databookContext)
  const classes = useStyles()

  const { error, loading, data } = useQuery(
    gql`
      query databook($id: ID!) {
        databook(id: $id) {
          id
          filters {
            id
            name
          }
        }
      }
    `,
    {
      variables: { id: databookId },
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
      <RemoveFilter filterId={filterId} dashboard={dashboard} />
    </Grid>
  )
}
