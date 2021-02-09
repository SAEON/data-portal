import RemoveChartButton from './_remove-chart-button'
import ChartIcon from 'mdi-react/ChartBubbleIcon'
import { Typography, Grid } from '@material-ui/core'
import useStyles from './style'
import clsx from 'clsx'
import WithGqlQuery from '../../../../../../../hooks/with-gql-query'
import { gql } from '@apollo/client'

const itemStyle = {
  display: 'flex',
  margin: 'auto',
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
          <WithGqlQuery
            QUERY={gql`
              query($ids: [ID!]) {
                charts(ids: $ids) {
                  id
                  title
                }
              }
            `}
            variables={{ ids: [id] }}
          >
            {({ error, loading, data }) => {
              if (loading) {
                return <Typography variant="overline">{id}</Typography>
              }

              if (error) {
                console.error(error)
                throw error
              }
              const chartTitle = data?.charts[0]?.title
              return <Typography variant="overline">{chartTitle || id}</Typography>
            }}
          </WithGqlQuery>
        </Grid>
        <Grid item style={itemStyle}>
          <RemoveChartButton chartId={id} dashboard={dashboard} />
        </Grid>
      </Grid>
    </div>
  )
}
