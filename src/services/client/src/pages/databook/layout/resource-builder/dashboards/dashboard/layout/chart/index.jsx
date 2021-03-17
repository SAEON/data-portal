import Loading from '../../../../../../../../components/loading'
import RemoveChartButton from './_remove-chart'
import { gql, useQuery } from '@apollo/client'
import ChartIcon from 'mdi-react/ChartBubbleIcon'
import Grid from '@material-ui/core/Grid'
import useStyles from './style'
import clsx from 'clsx'
import Content from './content'

export default ({ id, dashboardId }) => {
  const classes = useStyles()

  const { error, loading, data } = useQuery(
    gql`
      query($ids: [ID!]!) {
        charts(ids: $ids) {
          id
          title
        }
      }
    `,
    {
      variables: {
        ids: [id],
      },
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return (
    <div className={clsx(classes.layout)}>
      <Grid container justify="space-around" alignItems="center">
        <Grid item className={clsx(classes.item)}>
          <ChartIcon />
        </Grid>
        <Grid item className={clsx(classes.item)}>
          <Content {...data.charts[0]} />
        </Grid>
        <Grid item className={clsx(classes.item)}>
          <RemoveChartButton chartId={id} dashboardId={dashboardId} />
        </Grid>
      </Grid>
    </div>
  )
}
