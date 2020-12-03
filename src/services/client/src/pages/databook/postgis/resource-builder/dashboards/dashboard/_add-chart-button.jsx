import AddChartIcon from 'mdi-react/ChartPieIcon'
import { IconButton, Tooltip } from '@material-ui/core'

export default () => {
  return (
    <Tooltip title="Add chart" placement="bottom-start">
      <IconButton size="small">
        <AddChartIcon size={20} />
      </IconButton>
    </Tooltip>
  )
}
