import RemoveFilterButton from './_remove-filter-button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import useStyles from './style'
import clsx from 'clsx'
import WithGqlQuery from '../../../../../../../hooks/with-gql-query'
import { gql } from '@apollo/client'

export default ({ filterId, dashboard }) => {
  const classes = useStyles()

  return (
    <Grid item className={clsx(classes.filter)}>
      <WithGqlQuery
        QUERY={gql`
          query($ids: [ID!]) {
            filters(ids: $ids) {
              id
              name
            }
          }
        `}
        variables={{ ids: [filterId] }}
      >
        {({ error, loading, data }) => {
          if (loading) {
            return <Typography variant="overline">{filterId}</Typography>
          }

          if (error) {
            console.error(error)
            throw error
          }
          const filterName = data?.filters[0].name
          return <Typography variant="overline">{filterName || filterId}</Typography>
        }}
      </WithGqlQuery>
      <RemoveFilterButton filterId={filterId} dashboard={dashboard} />
    </Grid>
  )
}
