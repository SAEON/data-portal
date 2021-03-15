import RemoveChartButton from './_remove-chart-button'
import ChartIcon from 'mdi-react/ChartBubbleIcon'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import useStyles from './style'
import clsx from 'clsx'
import { gql, useQuery } from '@apollo/client'

const itemStyle = {
  display: 'flex',
  margin: 'auto',
}

const Content = ({ id }) => {
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
    return <Typography variant="overline">{id}</Typography>
  }

  if (error) {
    console.error(error)
    throw error
  }

  const chartTitle = data?.charts[0]?.title
  return <Typography variant="overline">{chartTitle || id}</Typography>
}

export default ({ chart: id, dashboard }) => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.layout)}>
      <Grid container justify="space-around" alignItems="center">
        <Grid item style={itemStyle}>
          <ChartIcon />
        </Grid>
        <Grid item style={itemStyle}>
          <Content id={id} />
        </Grid>
        <Grid item style={itemStyle}>
          <RemoveChartButton chartId={id} dashboard={dashboard} />
        </Grid>
      </Grid>
    </div>
  )
}
