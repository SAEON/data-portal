import RemoveFilterButton from './_remove-filter-button'
import ChartIcon from 'mdi-react/ChartBubbleIcon'
import { Typography, Grid } from '@material-ui/core'
import useStyles from './style'
import clsx from 'clsx'

const itemStyle = {
  display: 'flex',
  margin: 'auto',
}
export default ({ filterId, dashboard }) => {
  const classes = useStyles()

  return (
    <Grid item style={itemStyle}>
      <Typography variant="overline">{filterId}</Typography>
      <RemoveFilterButton filterId={filterId} dashboard={dashboard} />
    </Grid>
  )
}
